-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only see their own tasks
CREATE POLICY "Users can view their own tasks"
    ON public.tasks
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own tasks
CREATE POLICY "Users can insert their own tasks"
    ON public.tasks
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own tasks
CREATE POLICY "Users can update their own tasks"
    ON public.tasks
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own tasks
CREATE POLICY "Users can delete their own tasks"
    ON public.tasks
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert some dummy data (these will be user-specific after authentication)
-- Note: In production, users will create their own tasks after signing up
INSERT INTO public.tasks (user_id, title, description, completed)
SELECT 
    auth.uid(),
    'Welcome to Your Task Manager',
    'This is your first task. Mark it complete when you are ready!',
    false
WHERE auth.uid() IS NOT NULL;

INSERT INTO public.tasks (user_id, title, description, completed)
SELECT 
    auth.uid(),
    'Deploy Your Application',
    'Follow the tutorial to deploy this app to production on Vercel',
    false
WHERE auth.uid() IS NOT NULL;

INSERT INTO public.tasks (user_id, title, description, completed)
SELECT 
    auth.uid(),
    'Explore Supabase Features',
    'Check out real-time subscriptions, edge functions, and storage',
    false
WHERE auth.uid() IS NOT NULL;

