# EuroVote

**EuroVote** is a voting application designed to improve the viewing experience of the **Eurovision Song Contest** by turning it into a competitive activity among friends and family. Users can rate each performance in real time and compete to see who predicts the official results most accurately.

---

## Key Features

- Create and join private voting rooms  
- Set a username and participate with others  
- Assign points to each country after their performance  
- Modify rankings before final submission  
- View leaderboards within the room  
- Receive a personalized accuracy score after official results  
- Compare predictions against actual Eurovision outcomes  

---

## Technology Stack

### Frontend
- **React** – for building a responsive, interactive user interface  
- **React Router** – for page navigation  
- **Axios / Fetch API** – for communication with the backend  
- **CSS** – for styling and layout  
- **React Testing Library & Jest** – for unit and integration tests  

### Backend
- **Python** with **FastAPI** – for RESTful API development  
- **SQLAlchemy / Psycopg2** – for database interactions  
- **Pytest** – for backend testing   

### Database
- **PostgreSQL** – relational database for storing users, rooms, votes, and results  

### DevOps & Deployment
- **Docker** – containerization for consistent development and production environments  
- **Jenkins** – CI/CD automation for build, test, and deployment pipelines  
- **Unit & Integration Testing** – automated test runs before deployment  

---

## Documentation

## Use Case Diagram

The use case diagram illustrates the main interactions between the **User** and the **EuroVote system**. The User is the primary actor, performing actions to participate in a voting session.

![Use Case Diagram](docs/diagrams/UseCase%20Diagram.png)

### User Actions
- Create a room for others to join  
- Join a private room using a room code  
- Enter a username for the room  
- Assign points to each country after their performance  
- Review and submit results  
- Compare personal results with the official Eurovision outcomes  

> The system handles storing votes, calculating rankings, and displaying results, allowing users to focus on scoring performances and interacting socially.

## ER Diagram

The ER (Entity-Relationship) diagram represents the data structure of the **EuroVote** system. It shows how different entities interact and store information about rooms, players, countries, and results.

![ER Diagram](docs/diagrams/ER_Diagram.png)

### Entities and Relationships

- **Room**
  - Attributes: `RoomId`, `Name`  
  - A Room can have many Players.

- **Player**
  - Attributes: `PlayerId`, `Name`  
  - Players belong to a Room and assign Points to Countries.

- **Country**
  - Attributes: `CountryId`, `Name`  
  - Countries receive Points from Players.

- **Year**
  - Attributes: `YearId`, `Name`  
  - Stores yearly competition information and links to final Results.

- **Points** (relationship)
  - Connects `Player` and `Country`  
  - Attributes: `Points`, `CountryName`  
  - Represents the points a player assigns to a country.

- **Results** (relationship)
  - Connects `Country` and `Year`  
  - Attributes: `Points`, `Position`  
  - Represents the final ranking of a country in a given year.

> This ER diagram ensures data is organized for easy retrieval, accurate calculations, and leaderboard generation.


## Relational Database Schema
The relational schema represents the physical database structure in PostreSQL.
It includes primary keys, foreign keys, and table relationships for all entities in the system.

![ Relational Database Schema](docs/diagrams/RelationalDatabaseSchema.png)

- **Diagrams:** `/docs/diagrams`  
  - Use Case Diagram  
  - ER Diagram  
  - Relational Schema  
  - Class Diagram  
  - Sequence Diagram  

- **Figma Prototype:** `/docs/Figma Prototype`  
- **Product Vision:** `/docs/EuroVote's Product Vision.pdf`  

---
