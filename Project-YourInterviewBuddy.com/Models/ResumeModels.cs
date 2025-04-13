public class PersonalInfo
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
    public string Country { get; set; }
    public string Summary { get; set; }
    public string LinkedIn { get; set; }
    public string GitHub { get; set; }
    public string Portfolio { get; set; }
}

public class Education
{
    public string Institution { get; set; }
    public string Degree { get; set; }
    public string FieldOfStudy { get; set; }
    public string StartDate { get; set; } // Could also use DateTime if preferred
    public string EndDate { get; set; }
    public string Gpa { get; set; }
    public string Description { get; set; }
}

public class WorkExperience
{
    public string Company { get; set; }
    public string Position { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public bool CurrentlyWorking { get; set; }
    public string Description { get; set; }
    public List<string> Responsibilities { get; set; } = new List<string>();
}

public class Skill
{
    public string Name { get; set; }
    public string Level { get; set; } // Beginner, Intermediate, Advanced, Expert
}

public class Project
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Technologies { get; set; }
    public string ProjectUrl { get; set; }
}

public class Activity
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
}

public class ResumeData
{
    public PersonalInfo PersonalInfo { get; set; } = new PersonalInfo();
    public List<Education> Education { get; set; } = new List<Education>();
    public List<WorkExperience> WorkExperience { get; set; } = new List<WorkExperience>();
    public List<Skill> Skills { get; set; } = new List<Skill>();
    public List<Project> Projects { get; set; } = new List<Project>();
    public List<Activity> Activities { get; set; } = new List<Activity>();
}