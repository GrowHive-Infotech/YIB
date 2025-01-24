namespace Project_YourInterviewBuddy.com.Data
{
    public class Constants
    {
        public const string INSERT_POST = @"
        INSERT INTO Post (Title, Description, Author, Createday, Updateday, lastUpdatedBy, likes, tags)
        VALUES (@Title, @Description, @Author, @Createday, @Updateday, @lastUpdatedBy, @likes, @tags);
    ";

        public const string GET_POST = "Select * from post;";
    }
}
