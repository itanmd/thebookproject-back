-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: the_book_project
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `idbooks` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `uuid` int NOT NULL,
  `pages` int NOT NULL,
  `price` int NOT NULL,
  `categoryId` int NOT NULL,
  `image_link` varchar(255) NOT NULL,
  PRIMARY KEY (`idbooks`),
  UNIQUE KEY `idbooks_UNIQUE` (`idbooks`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'dream of the red chamber','\"Dream of the Red Chamber\" is a classic Chinese novel that depicts the decline of a noble family and explores themes of love, desire, and the ephemeral nature of life.',588965,1300,64,2,'dream of the red chamber_1687899437959-449073962.jpg'),(2,'The Little Prince','\"The Little Prince\" is a beloved novella by Antoine de Saint-Exupéry that follows the whimsical journey of a young prince who encounters various characters while imparting profound insights about life, love, and the importance of childlike wonder.',588966,80,7,2,'the-little-prince-1_1688670540302-587567749.jpg'),(3,'The Catcher in the Rye','\"The Catcher in the Rye\" is J.D. Salinger\'s iconic novel about a disillusioned teenager navigating the complexities of adulthood in 1950s New York City',588967,220,9,2,'The Catcher in the Rye_1687899118822-757371871.jpg'),(5,'She','\"She\" is a captivating adventure novel by H. Rider Haggard that tells the story of a daring journey to a hidden African kingdom ruled by a mysterious and immortal queen.',588968,400,13,1,'she_1687987199030-811273634.jpg'),(6,'The Alchemist','\"The Alchemist\" is a renowned philosophical novel by Paulo Coelho that follows a young Andalusian shepherd on a transformative journey in search of his personal legend, exploring the themes of destiny, spirituality, and the pursuit of one\'s dreams.',588969,150,24,1,'18144590_1687987296463-675261400.jpg'),(7,'And Then There Were None','\"And Then There Were None\" is a gripping mystery novel by Agatha Christie where ten strangers are lured to an isolated island and begin to die one by one, leaving the remaining survivors to unravel the chilling truth of their shared dark past.',588970,250,9,6,'and then there were none_1687987450295-79653080.jpg'),(8,'Gone Girl ','\"Gone Girl\" is a gripping thriller by Gillian Flynn, where a husband becomes the prime suspect in his wife\'s disappearance, unraveling a twisted game of secrets and lies.',588971,400,13,6,'Gone Girl — Gillian Flynn_1687987624363-127990931.jpg'),(9,'The Godfather','\"The Godfather\" by Mario Puzo is an epic crime novel that chronicles the powerful Corleone family\'s rise to dominance in the world of organized crime, interweaving themes of loyalty, power, and the consequences of choices made.',588972,400,35,6,'The Godfather — Mario Puzo_1687987718095-207930759.jpg'),(10,'Harry Potter and the Sorcerers Stone','\"Harry Potter and the Sorcerer\'s Stone\" is a magical tale by J.K. Rowling, where a young orphan embarks on a thrilling journey through the wizarding world to uncover his true destiny.',588973,300,22,4,'harry potter and the sorcerers stone_1687987880978-727184616.jpg'),(12,'The Hobbit','\"The Hobbit\" is an enchanting adventure novel by J.R.R. Tolkien that follows the journey of Bilbo Baggins, a reluctant hobbit, as he accompanies a group of dwarves on a quest to reclaim their homeland from the fearsome dragon Smaug.',588974,400,25,4,'the hobbit__1687988152320-95664510.jpg'),(13,'The Lion, the Witch and the Wardrobe','\"The Lion, the Witch, and the Wardrobe\" is a magical tale by C.S. Lewis, where four siblings stumble upon a hidden world through a wardrobe and must join forces with a noble lion to defeat an evil witch.',588975,250,9,4,'the lion, the witch and the wardrobe__1687988326950-542960416.jpg'),(14,'A Tale of the Christ','\"A Tale of the Christ\" by Lew Wallace is an epic historical novel that intertwines the life of a Jewish prince, Judah Ben-Hur, with the events of Jesus Christ, depicting a tale of personal transformation and faith.',588976,500,13,3,'A Tale of the Christ — Lew Wallace_1687988460077-531366611.jpg'),(15,'A Tale of Two Cities','\"A Tale of Two Cities\" is a classic novel by Charles Dickens that portrays the lives of characters caught in the turmoil of the French Revolution, intertwining themes of love, sacrifice, and the pursuit of justice.',588977,300,13,3,'a tale of two cities_1687988532272-56454860.jpg'),(16,'The Name of the Rose','\"The Name of the Rose\" by Umberto Eco is a gripping historical mystery novel set in a medieval monastery, where a Franciscan friar investigates a series of murders while uncovering a web of secrets and intellectual intrigue',588978,500,30,3,'The Name of the Rose — Umberto Eco_1687988618839-706945681.jpg'),(17,'Angels & Demons','\"Angels & Demons\" by Dan Brown is a fast-paced thriller that follows symbologist Robert Langdon as he races against time to stop a secret society from destroying the Vatican, blending art, science, and religion in a high-stakes quest.',588979,600,28,5,'Angels & Demons — Dan Brown_1687988714608-295511120.jpg'),(18,'The Da Vinci Code','\"The Da Vinci Code\" by Dan Brown is an enthralling mystery novel that combines art, history, and religious symbolism in a thrilling quest for a hidden secret.',588980,500,35,5,'the de vinci code_1687988806457-674281875.jpg'),(19,'Love Story','\"Love Story\" by Erich Segal is a poignant and bittersweet tale of young love between two college students from different backgrounds.',588981,200,15,7,'Love Story — Erich Segal_1687988889946-715840616.jpg'),(20,'The Bridges of Madison County','\"The Bridges of Madison County\" by Robert James Waller is a captivating romance novel that unfolds over four days, exploring the profound connection between a photographer and an Italian war bride',588982,150,13,7,'The Bridges of Madison County — Robert James Waller_1687988951620-307708899.jpg'),(21,'The Fault in Our Stars','\"The Fault in Our Stars\" by John Green is a heartfelt and poignant young adult novel that tells the story of two teenagers with cancer who find love and meaning in the face of mortality.',588983,300,16,7,'The Fault in Our Stars — John Green_1687989013122-485610786.jpg');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-06 23:32:05
