# Caption of the day

Caption of the Day is a social media platform where users engage through shared experiences and captions. It's an environment that fosters community interaction, creativity, and content discovery. Our platform is designed to offer a user-friendly experience with a focus on community engagement and personalized content.

![Responsive Design Screenshot](src\assets\AmIResponsive.png)

[View the live website on Heroku](https://caption-of-the-day-ed90d78aee19.herokuapp.com/)


## Table of Contents

* [Introduction](#introduction)
* [UX](#ux)
  * [User Goals](#user-goals)
  * [User Stories](#user-stories)
  * [Design Choices](#design-choices)
    * [Colors](#colors)
    * [Typography](#typography)
    * [Imagery](#imagery)
* [Features](#features)
  * [Existing Features](#existing-features)
  * [Future Features](#future-features)
* [Packages and Tools](#packages-and-tools)
* [Testing](#testing)
  * [Manual Testing](#manual-testing)
  * [Automated Testing](#automated-testing)
  * [Known Bugs](#known-bugs)
* [Deployment](#deployment)
  * [Heroku](#heroku)
    *[Initial Setup](#initial-setup)
    *[Preparing the Application](#preparing-the-application)
    *[Deployment](#deployment)
  * [Forking the GitHub Repository](#forking-the-github-repository)
  * [Making a Local Clone](#making-a-local-clone)
* [Credits](#credits)
  * [Content](#content)
  * [Media](#media)

---

## UX

### User Goals

The primary goals of the target audience for Caption of the Day are centered around creative expression, social interaction, and content discovery in a user-friendly digital environment. The platform is tailored to meet the following user aspirations:

1. **Creative Sharing**: Users seek a platform where they can express themselves creatively through unique captions and imagery. The ability to craft and share content that resonates with personal experiences or interests is paramount.

2. **Community Engagement**: A strong desire exists for connecting with a like-minded community. Users aim to engage in meaningful interactions, be it through commenting on posts, reacting to content, or participating in caption-themed discussions.

3. **Discovering Diverse Content**: Users are interested in exploring and discovering a wide range of captions and images that span various themes, moods, and perspectives. This exploration is a source of inspiration, entertainment, and learning.

4. **Ease of Use**: The target audience values an intuitive and straightforward user interface that makes navigation, content creation, and interaction effortless, regardless of their technical expertise.

5. **Personalized Experience**: Users look for a personalized feed that reflects their interests, past interactions, and preferred content, enhancing their engagement and time spent on the platform.

6. **Safe and Supportive Environment**: A safe space for sharing and interaction, where users feel supported and encouraged to express themselves without judgment or negativity.

By focusing on these goals, Caption of the Day aims to establish itself as a premier platform for creative sharing and community building, setting itself apart in the realm of social media.

### User Stories

1. **Navigation & Accessibility**
   - As a user, I want to access a navigation bar from every page for easy navigation.
   - As a user, I want efficient routing through pages for seamless content viewing without page refreshes.
   - As a logged-out user, I want to see options to sign in or sign up for access to additional features.
   - As a user, I want to view user avatars for easier identification within the application.

2. **Authentication & Profile Management**
   - As a new user, I want to sign up to access all features available to registered users.
   - As a returning user, I want the system to remember my session to avoid frequent logins.
   - As a user, I want to view and edit my profile, including changing my picture and bio.
   - As a user, I want to update my login credentials for enhanced security and personalization.
   - As a user, I want to follow or unfollow other users to curate my content feed.

3. **Post Interaction & Management**
   - As a logged-in user, I want to create and edit posts to share images and experiences.
   - As a user, I want to comment on and like posts to engage with the community.
   - As a post creator, I want to edit my posts for updates or corrections.
   - As a comment creator, I want to edit or delete my comments to manage my contributions.

4. **Content Discovery & Engagement**
   - As a user, I want to view recent and popular posts to stay up-to-date with community content.
   - As a user, I want to use keywords to search for specific posts and profiles.
   - As a logged-in user, I want to view posts from users I follow and posts I have liked for personalized content.

5. **User Experience & Design**
   - As a user, I want an aesthetically pleasing and readable interface for a comfortable experience.
   - As a user, I want a visually appealing color scheme and consistent design across the platform.
   - As a user, I want a fast and responsive application for a smooth browsing experience.

6. **System Functionality & Performance**
   - As a developer, I want up-to-date dependencies for a secure and efficient application.
   - As a developer, I want to fix any missing imports and incorrect logic for uninterrupted application functionality.

7. **Error Handling & System Reliability**
   - As a user, I want the application to handle errors gracefully so that I can continue using the platform without confusion.
   - As a user, I want to easily see my login status and have access token refresh for secure and continuous access.


### Design Choices

Our design philosophy at "Caption of the Day" is deeply rooted in providing a serene and approachable environment for our users to share and explore. The design choices are reflective of our commitment to a clean, modern, and user-centric interface.

#### Colors

The color scheme is a soothing mix of soft teal and cloud white, invoking a sense of calm and openness reminiscent of a clear sky. Teal, a color often associated with clarity of thought and communication, aligns perfectly with our platform's goal of fostering clear and open exchanges between users. The neutral grey accents used for text and icons provide a gentle contrast, ensuring readability and focus on user content without overwhelming the senses.

#### Typography

We've selected a sans-serif font that balances form and function, offering excellent readability and a contemporary feel. This choice reflects our aim to present text in a manner that is both appealing and easy on the eyes, facilitating longer periods of engagement without strain. The font weight is carefully chosen to ensure that the textual content stands out against the light background, enhancing user focus on the stories and captions shared by the community.

#### Imagery

The use of cloud imagery in our upload icon is symbolic of the seamless and boundless experience we offer, akin to uploading your thoughts to the vastness of the sky. User avatars are presented in greyscale to maintain uniformity and visual harmony, while also allowing the vibrant user-generated content to take center stage. Our logo, which combines a caption bubble and a camera shutter, encapsulates our core offering — a platform to visually share and caption life's moments.

These design elements come together to create an atmosphere that is both inspiring and tranquil, inviting users to stay, explore, and express themselves freely on Caption of the Day.

## Features

Caption of the Day enriches the user experience with a suite of interactive features designed to foster engagement and creativity within the community:

- **User Authentication**: A robust and secure login and registration system that protects user data and ensures a trustworthy environment for sharing personal moments.
- **Profile Management**: Comprehensive profile customization options allow users to express their identity through bios, profile images, and a catalogue of their posts.
- **Post Creation**: An intuitive and user-friendly interface for creating posts, enabling users to share their stories with text and image content that captures the essence of their experiences.
- **Interactive Features**: Engaging social interaction tools that allow users to like and comment on posts, creating a dialogue and connection between community members.
- **Infinite Scroll**: A smooth and uninterrupted browsing experience that dynamically loads content as the user scrolls, making content discovery seamless and enjoyable.

### Future Features

Looking ahead, Caption of the Day is excited to explore and develop additional features that enhance connection and engagement:

- **Live Streaming**: Introduce the ability for users to share live moments with their followers, bringing real-time connection to the community.
- **Advanced Content Filters**: Implement smart filters that allow users to customize their content discovery based on their interests, trends, and activities.
- **Augmented Reality (AR) Integration**: Explore AR technology to enable users to create and share immersive posts that blur the lines between digital and physical worlds.
- **Virtual Gatherings**: Create virtual spaces where users can host and participate in events, fostering deeper community bonds.
- **Mood-Based Content Suggestion**: Develop a mood analysis feature that suggests content based on the user's current mood, detected through machine learning algorithms.
- **Multi-Language Support**: Broaden the platform's reach by offering a multilingual interface that welcomes users from different linguistic backgrounds.
- **Eco-Friendly Initiatives**: Introduce features that promote environmental awareness, including eco-challenges and sustainability-focused content sharing.

These prospective features aim to keep Caption of the Day at the forefront of innovation, providing users with an ever-evolving platform that not only entertains but also connects and inspires.


## Packages and Tools

In this project, we've utilized a variety of libraries and tools to enhance functionality and development efficiency. Below is a list of these technologies along with their purposes:

- **React**
  - A JavaScript library for building dynamic and interactive user interfaces. Ideal for single-page applications.
  
- **Axios**
  - A promise-based HTTP client for making HTTP requests, used for fetching or saving data from/to a server.

- **Bootstrap & React-Bootstrap**
  - Bootstrap provides responsive design elements and layouts. React-Bootstrap adapts these into React components for consistent styling.

- **JWT-Decode**
  - A library for decoding JSON Web Tokens. Useful for interpreting the token's data on the client side.

- **React Router DOM**
  - Manages navigation in React applications, enabling dynamic routing without page reloads.

- **React Infinite Scroll Component**
  - Implements infinite scrolling, loading content as the user scrolls down, enhancing user experience.

- **Testing Libraries (Jest, React Testing Library)**
  - Jest is a simple testing framework, and React Testing Library provides utility functions for testing React components.

- **Web Vitals**
  - Measures website performance in terms of loading, interactivity, and visual stability.

- **Mock Service Worker (MSW)**
  - Mocks HTTP requests in development and testing environments. Ideal for testing network request scenarios.

- **Scripts for Building, Testing, and Starting**
  - Specific scripts are defined for building, testing, and starting the application, particularly with Heroku deployment in mind.

- **Node.js and npm Versions**
  - The project specifies Node.js and npm versions to ensure a consistent environment setup.

Additionally, specific scripts were defined for building, testing, and starting the application, particularly with Heroku deployment in mind. The project also specifies Node.js and npm versions for consistent environment setup.

## Testing

To ensure the highest quality and functionality, the project includes comprehensive testing strategies:

### Manual Testing

- **Process**: Conducted thorough manual testing across various devices (including mobile, tablet, and desktop) and browsers (like Chrome, Firefox, Safari, and Edge) to verify compatibility and responsiveness.
- **Focus Areas**: Special attention was given to UI/UX consistency, interactive elements, and layout adjustments across different screen sizes and resolutions.
- **Outcome**: This testing phase helped in identifying and rectifying device-specific and browser-specific issues, ensuring a seamless user experience across all platforms.

### Automated Testing

- **Framework and Tools**: Utilized Jest and React Testing Library for writing and executing automated tests.
- **Test Coverage**: Focused on critical functionalities including user authentication, API integration, form submissions, and interactive components.
- **Continuous Integration**: Integrated these tests into a CI/CD pipeline, ensuring that every build is automatically tested before deployment.
- **Outcome**: Automated testing has significantly increased the reliability of the application, reducing the chances of regressions and bugs in production.

### Known Bugs

- **Current Status**: As of the latest deployment, no major bugs have been reported. The application is monitored continuously for any anomalies.
- **Minor Issues**: A log of minor issues is maintained, with details about their nature and the environment in which they were encountered.
- **Resolution Process**: These issues are being addressed in a prioritized manner, with regular updates and patches being rolled out.
- **Feedback and Reporting**: Users are encouraged to report any bugs or issues they encounter, contributing to the application's ongoing improvement.

## Deployment

### Heroku
This project is deployed on Heroku, a cloud platform service that enables easy deployment and scaling for web applications. The deployment process includes the following steps:

#### Initial Setup
1. **Create a Heroku Account**: Sign up for a Heroku account at [Heroku's website](https://www.heroku.com/).
2. **Install Heroku CLI**: Download and install the Heroku Command Line Interface (CLI) to interact with Heroku from your local machine.

#### Preparing the Application
1. **Procfile**: Create a `Procfile` in your project root directory. This file tells Heroku how to run your application.
2. **Requirements.txt**: Ensure you have a `requirements.txt` file listing all project dependencies.
3. **Config Vars**: Set up necessary configuration variables in Heroku (like `SECRET_KEY`, database URL, etc.).

#### Deployment
1. **Create a Heroku App**: Use the Heroku CLI to create a new app.
2. **Add Buildpacks**: If necessary, add the correct buildpacks via the Heroku dashboard or CLI.
3. **Deploy**: Push your code to Heroku either by connecting your GitHub repository to Heroku or using the Heroku CLI to deploy your application.
4. **Database Migration (if applicable)**: Run database migrations using the Heroku CLI.

#### Final Steps
1. **Enable the Web Dyno**: Make sure the web dyno is up and running after deployment.
2. **Open the App**: You can open your application from the Heroku dashboard or using the CLI command `heroku open`.

For more detailed instructions and troubleshooting, visit the official [Heroku Dev Center](https://devcenter.heroku.com/).

### Forking the GitHub Repository

Forking the GitHub repository allows you to make a copy of the original project on your own GitHub account, enabling you to make changes without affecting the original. Here's how to do it:

1. **Go to the Repository**: Navigate to the original repository on GitHub.
2. **Fork the Repository**: Click the 'Fork' button, located at the top right of the repository page. This creates a copy of the repository in your GitHub account.
3. **Clone Your Fork**: Once forked, you can clone your fork to your local machine for further development.

### Making a Local Clone

Cloning a GitHub repository creates a local copy on your machine, allowing you to sync between the two locations. Here are the steps:

1. **Clone the Repository**: On the GitHub repository page, click the 'Code' button and copy the URL under 'Clone with HTTPS'.
2. **Open Terminal**: Open your terminal and navigate to the directory where you want the clone to be created.
3. **Clone Command**: Type `git clone`, and then paste the URL you copied in Step 1. Press Enter to create your local clone.

## Credits

### Content

This project has benefited from several educational resources and example projects provided by the Code Institute throughout the course of my bootcamp. The following projects deserve special mention for their direct impact on the development of this application:

- **Django REST Framework Example Project**: A practical example provided by the Code Institute that guided the development of Web APIs using Django REST framework. This project served as a template for best practices in API development with Django and Python.

- **Moments Project**: Another resource from the Code Institute, the Moments project was instrumental in illustrating the development of a full-stack application with a focus on user experience. Various aspects of its design and functionality have been adapted and incorporated into this project.

A heartfelt thank you goes to the Code Institute for the array of projects and resources that have been made available throughout my bootcamp. These resources have not only guided this project but have also been a cornerstone of my learning journey, providing me with a solid foundation in software development and a deep understanding of full-stack development practices.

### Media

The visual content for this project was sourced from Pixabay and generated using DALL-E by OpenAI:

- **Pixabay Images**: A variety of high-quality images were sourced from [Pixabay](https://pixabay.com/), a platform offering free-to-use, royalty-free images. These images were carefully chosen to enhance the visual aspect of the project.
- **DALL-E Generated Images**: Specific imagery was created using [DALL-E](https://openai.com/dall-e), OpenAI's AI image generator, to produce unique and tailored visuals for the project.
