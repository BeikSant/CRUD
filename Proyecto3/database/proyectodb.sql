-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-07-2021 a las 03:39:40
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`category_id`, `category`) VALUES
(3, 'Soneto'),
(4, 'Terceto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `poems`
--

CREATE TABLE `poems` (
  `poem_id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `poem` text DEFAULT NULL,
  `date_submited` datetime DEFAULT current_timestamp(),
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date_approved` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `poems`
--

INSERT INTO `poems` (`poem_id`, `title`, `poem`, `date_submited`, `category_id`, `user_id`, `date_approved`) VALUES
(1, 'La Belleza', 'La Belleza es fecunda y bella', '2021-07-05 01:25:10', 3, 1, '2021-07-05 01:25:10'),
(3, 'Ecuaciones1', 'La ecuaciones mas ilusionadas', '2021-07-05 01:27:02', 4, 3, '2021-07-05 01:27:02'),
(4, 'Ecuaciones', 'La Ecuacion es la luz de la imaginacion', '2021-07-05 01:42:47', 4, 1, '2021-07-05 01:42:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL,
  `token` char(64) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token_expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `pass_phase` varchar(30) DEFAULT NULL,
  `is_admin` tinyint(4) DEFAULT NULL,
  `date_register` datetime DEFAULT current_timestamp(),
  `profile_pic` varchar(30) DEFAULT NULL,
  `registration_confirmed` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `username`, `pass_phase`, `is_admin`, `date_register`, `profile_pic`, `registration_confirmed`) VALUES
(1, 'Beiker Antonio', 'Santorum Sasaguay', 'santorumbeiker068@gmail.com', 'beiksant', 'beiksant', 1, '2021-07-01 01:04:34', 'hola.png', 1),
(3, 'Jose Enrique', 'Guzman Peres', 'jose@gmail.com', 'JoseEnrique12', 'jose enquie', 0, '2021-07-01 23:28:04', 'sdsffsfs.png', 1),
(7, 'Angel Ricardo', 'Mena Guayllas', 'angel@gmail.com', 'angelMena', 'angel123', 0, '2021-07-05 19:25:15', 'angel.png', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `poems`
--
ALTER TABLE `poems`
  ADD PRIMARY KEY (`poem_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `poems`
--
ALTER TABLE `poems`
  MODIFY `poem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `token_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `poems`
--
ALTER TABLE `poems`
  ADD CONSTRAINT `poems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `poems_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Filtros para la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
