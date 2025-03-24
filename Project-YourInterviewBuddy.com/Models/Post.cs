namespace Project_YourInterviewBuddy.com.Models
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public DateTime Createday { get; set; }
        public DateTime Updateday { get; set; }
        public string lastUpdatedBy { get; set; }
        public int likes { get; set; }
        public List<string> tags { get; set; }
        public string technology { get; set; }

    }
}
