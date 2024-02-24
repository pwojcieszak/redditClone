### Piotr Wojcieszak
# Reddit Clone Website
## 1. Purpose
The goal of the project was to get hands-on experience with the Angular framework. I used the Spring framework for handling backend. 

The site offers the ability to create an account, create and view posts/subreddits, comment and rate posts.

## 2. Stack
### Backend
- Spring 3.2.2 - JPA, Mail, Security, Web
- Java 17
- Mapstruck 1.5.5 Final - code generator used for mappings
- Springdoc OpenAPI 2.3.0 (with Swagger UI) - Generating documentation
- JJWT 0.11.5 - Java JSON Web Token implementation
- Lombok 1.18.30 - annotations library
- MySQL 8.0
### Frontend
- Angular 17.1.0 with standalone components
- Bootstrap 5.3.2
- ngx-toastr 18.0.0 - notification library

## 3. Sample screenshots
#### Home
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/5cac36a6-0978-4eb2-b966-d4ed56c425ed)

#### Post view
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/99d3234d-d19c-447f-a580-c72a32cf008c)

#### Subreddit view
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/11ea5d6d-112c-45b6-b537-ae062ad43451)

#### Login
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/d5ee1d0e-3709-4672-8998-c0a4bbd3545c)

#### Register
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/f4a99bd7-0c72-4232-a7a5-15b061e84f0d)

#### User view
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/4cbcf006-9ac4-44e1-8d2e-c0e2246fb8f2)

#### Create post
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/06264898-7f85-457a-8c04-eef6bc34af67)

#### Create sub
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/5b610323-2531-46f0-b8ef-e172f1c5843e)

#### All
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/fe693f6d-9022-4f81-adb5-8cef5d684662)

#### Swagger UI
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/8d1a0183-f968-4207-920d-88d3de8f2139)

#### Swagger endpoint detail
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/3a2a47d1-140d-4a12-bdb2-d12e0c11e033)

#### Swagger schemas (DTO's)
![image](https://github.com/pwojcieszak/redditClone/assets/86632496/561baf82-3799-47f7-9124-0f0d41cd2040)

## 4. How to run
Having Angular CLI installed, enter 'redditCloneFrontend' folder and type `ng serve`. Website should be accessible on `http://localhost:4200/`.

Having Maven CLI installed and MySQL service running in the background, enter 'redditCloneBackend' folder and type `mvn spring-boot:run`. Swagger UI documentation should be available at `http://localhost:8080/swagger-ui.html`.

I am sending verification and notification emails to my 'Mailtrap'( 'Email Delivery Platform to test, send and control email infrastructure in one place.' ). While testing application by yourself, be sure to activate newly created account by updating corresponding row's 'enabled' column, like `UPDATE 'reddit_clone'.'user' SET 'enabled' = 1 WHERE ('user_id' = '22');
`. All data I used is stored locally and manually inserted using the UI so you will need to create few posts and subreddits by yourself to test how it all works. 


## 5. Sources
My project was heavily modeled on a tutorial published by the freeCodeCamp.org channel on YT, which is available [here](https://www.youtube.com/watch?v=DKlTBBuc32c&list=WL&index=11&ab_channel=freeCodeCamp.org). The author of the tutorial used outdated versions of the technology in view of which I had to make numerous changes to the code. In addition, I added new components to the project to make it a truer representation of Reddit.
