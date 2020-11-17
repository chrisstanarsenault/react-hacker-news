# React HackerNews Feed

Project 3 built for the project a week challenge from [Florin Pop]("https://github.com/florinpop17"). Being built with React and TailwindCSS, using the [HackerNews API]("https://hn.algolia.com/api").

View live project [here]("https://chris-react-hacker-news.netlify.app"). Should be fully responsive.

Upon initial page load, the app will display the front page stories from Hacker News, 10 stories at a time. Infinite scroll has been introduced so user can continually scroll through the stories, and once you have reached the 10th story, will fetch next page and load in the next time.

The user can also search in the search bar for topics that interest thing.

Stories will show the story title which if clicked, will redirect user to actual article. Story container also display the author, date created, number of points and comments.

## Needed bug fixes and future features

### Needed Bug Fixes

- Stop infinite scroll from making calls once max page has been reached
- Stop searched topic from loading multiple pages when API called

### Future Features

- Better loading animations
- Make author tag bring up stories written by author
- Make comment tag bring up comments relating to that story
