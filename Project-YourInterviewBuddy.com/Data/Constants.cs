namespace Project_YourInterviewBuddy.com.Data
{
    public class Constants
    {
        public const string INSERT_POST = @"
        INSERT INTO Posts (Title, content, Author, Createday, Updateday, lastUpdatedBy, likes, tags,technology)
        VALUES (@Title, @Description, @Author, @Createday, @Updateday, @lastUpdatedBy, @likes, @tags, @technology);
    ";

        public const string GET_POST = "Select * from posts;";
    }
}
