
-- 1) Move has_role into a private schema so signed-in users cannot RPC it,
--    while RLS policies (which reference it by qualified name) keep working.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO postgres, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Rebuild policies that referenced public.has_role to use private.has_role
DROP POLICY IF EXISTS "admins manage activities" ON public.activities;
CREATE POLICY "admins manage activities" ON public.activities
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "admins manage batches" ON public.batches;
CREATE POLICY "admins manage batches" ON public.batches
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "admins manage events" ON public.events;
CREATE POLICY "admins manage events" ON public.events
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "admins manage notifications" ON public.notifications;
CREATE POLICY "admins manage notifications" ON public.notifications
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "admins manage students" ON public.students;
CREATE POLICY "admins manage students" ON public.students
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'))
  WITH CHECK (private.has_role(auth.uid(),'admin') OR private.has_role(auth.uid(),'super_admin'));

DROP POLICY IF EXISTS "Admins can read applications" ON public.applications;
CREATE POLICY "Admins can read applications" ON public.applications
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin'));

-- Drop the now-orphaned public wrapper so it is no longer RPC-callable.
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 2) Remove the always-true permissive INSERT policy on applications.
-- The /apply form submits through a server function using the service role,
-- which bypasses RLS, so no anon insert policy is needed.
DROP POLICY IF EXISTS "Anyone can apply" ON public.applications;
REVOKE INSERT ON public.applications FROM anon;

-- 3) Lock down sensitive PII on students.
-- Registration goes through a server function with service role; no client
-- needs raw access to students. Remove the public read policy entirely.
DROP POLICY IF EXISTS "students public read" ON public.students;
REVOKE SELECT ON public.students FROM anon;

-- 4) Stop broadcasting students + notifications over Realtime to all subscribers.
ALTER PUBLICATION supabase_realtime DROP TABLE public.students;
ALTER PUBLICATION supabase_realtime DROP TABLE public.notifications;
