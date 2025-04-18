using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Threading.Tasks;

public class DbSetupService
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public DbSetupService(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString= _configuration["MySettings:CockroachDb1"];
    }

    public async Task RunCreateScriptsAsync()
    {
        var createScripts = new[]
        {
            @"CREATE TABLE IF NOT EXISTS public.technologies (
                id UUID NOT NULL DEFAULT gen_random_uuid(),
                name STRING NOT NULL,
                count INT8 NULL DEFAULT 0:::INT8,
                type STRING NULL,
                CONSTRAINT technologies_pkey PRIMARY KEY (id ASC),
                UNIQUE INDEX technologies_name_key (name ASC)
            ) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION;",

            @"CREATE TABLE IF NOT EXISTS public.users (
                id INT8 NOT NULL DEFAULT unique_rowid(),
                email VARCHAR(255) NOT NULL,
                name STRING NOT NULL,
                password STRING NOT NULL,
                ""role"" VARCHAR(50) NOT NULL DEFAULT 'user':::STRING,
                is_active BOOL NOT NULL DEFAULT true,
                created_at TIMESTAMP NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp():::TIMESTAMP,
                resume_url STRING NULL,
                CONSTRAINT users_pkey PRIMARY KEY (id ASC),
                UNIQUE INDEX users_email_key (email ASC),
                UNIQUE INDEX ix_users_email (email ASC)
            ) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION;",

            @"CREATE TABLE IF NOT EXISTS public.interview_questions (
                id UUID NOT NULL DEFAULT gen_random_uuid(),
                question STRING NOT NULL,
                answer STRING NOT NULL,
                technology UUID NOT NULL,
                difficulty_level STRING NULL,
                created_at TIMESTAMPTZ NULL DEFAULT now():::TIMESTAMPTZ,
                technology_type STRING NULL,
                CONSTRAINT interview_questions_pkey PRIMARY KEY (id ASC),
                CONSTRAINT fk_technology FOREIGN KEY (technology) REFERENCES public.technologies(id) ON DELETE CASCADE,
                CONSTRAINT check_difficulty_level CHECK (difficulty_level IN ('Easy':::STRING, 'Medium':::STRING, 'Hard':::STRING))
            ) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION;",

            @"CREATE TABLE IF NOT EXISTS public.jobs ( 
                id UUID NOT NULL DEFAULT gen_random_uuid(),
                job_title STRING NOT NULL,
                company_name STRING NOT NULL,
                location STRING NULL,
                employment_type STRING NULL,
                salary_range STRING NULL,
                experience_required INT8 NULL,
                skills_required STRING[] NULL,
                job_description STRING NOT NULL,
                posted_at TIMESTAMPTZ NULL DEFAULT now():::TIMESTAMPTZ,
                application_deadline TIMESTAMPTZ NULL,
                job_url STRING NULL,
                CONSTRAINT jobs_pkey PRIMARY KEY (id ASC),
                UNIQUE INDEX jobs_job_url_key (job_url ASC),
                CONSTRAINT check_employment_type CHECK (employment_type IN ('Full-time':::STRING, 'Part-time':::STRING, 'Contract':::STRING, 'Internship':::STRING, 'Freelance':::STRING, 'Temporary':::STRING)),
                CONSTRAINT check_experience_required CHECK (experience_required >= 0:::INT8)
            ) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION;",

            @"CREATE TABLE IF NOT EXISTS public.parsed_resumes (
                id UUID NOT NULL DEFAULT gen_random_uuid(),
                email STRING NOT NULL,
                phone STRING NOT NULL,
                experience INT8 NULL,
                roles_and_responsibilities STRING NOT NULL,
                tech_stack STRING[] NOT NULL,
                created_at TIMESTAMPTZ NULL DEFAULT now():::TIMESTAMPTZ,
                CONSTRAINT parsed_resumes_pkey PRIMARY KEY (id ASC),
                UNIQUE INDEX parsed_resumes_email_key (email ASC),
                CONSTRAINT check_experience CHECK (experience >= 0:::INT8)
            ) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION;",

            @"CREATE TABLE IF NOT EXISTS public.posts (
                id UUID NOT NULL DEFAULT gen_random_uuid(),
                title STRING NOT NULL,
                content STRING NOT NULL,
                author STRING NOT NULL,
                created_at TIMESTAMPTZ NULL DEFAULT now():::TIMESTAMPTZ,
                updated_at TIMESTAMPTZ NULL,
                tags STRING[] NULL,
                likes INT8 NULL DEFAULT 0:::INT8,
                technology STRING NOT NULL,
                CONSTRAINT posts_pkey PRIMARY KEY (id ASC)
            ) LOCALITY REGIONAL BY TABLE IN PRIMARY REGION;"
        };

        using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        foreach (var script in createScripts)
        {
            using var cmd = new NpgsqlCommand(script, connection);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}
