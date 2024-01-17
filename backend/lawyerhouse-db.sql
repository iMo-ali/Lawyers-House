--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE ROLE lawyerhouse WITH
LOGIN
SUPERUSER
INHERIT
CREATEDB
CREATEROLE
REPLICATION
ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:vdMlxjOJZOd4A7s80TLL5g==$LHTtptJBmwE1ObMF/cOXRZrM/7JWst/16sHetDxRqhk=:/DARok7kRPnz4Ulz7R+FURNVl/o1ZyyDhiyNErqGLz4=';

--
-- Name: lawhouse; Type: DATABASE; Schema: -; Owner: lawyerhouse
--

CREATE DATABASE lawhouse WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE lawhouse OWNER TO lawyerhouse;

\connect lawhouse

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: lawyer_type; Type: TYPE; Schema: public; Owner: lawyerhouse
--

CREATE TYPE public.lawyer_type AS ENUM (
    'PARTNER',
    'PARALEGAL'
);


ALTER TYPE public.lawyer_type OWNER TO lawyerhouse;

--
-- Name: staff_status; Type: TYPE; Schema: public; Owner: lawyerhouse
--

CREATE TYPE public.staff_status AS ENUM (
    'ACTIVE',
    'TERMINATED',
    'ON_LEAVE'
);


ALTER TYPE public.staff_status OWNER TO lawyerhouse;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CLIENT; Type: TABLE; Schema: public; Owner: lawyerhouse
--

CREATE TABLE public."CLIENT" (
    client_id integer NOT NULL,
    fname character varying NOT NULL,
    lname character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    date_registered timestamp with time zone NOT NULL
);


ALTER TABLE public."CLIENT" OWNER TO lawyerhouse;

--
-- Name: CLIENT_client_id_seq; Type: SEQUENCE; Schema: public; Owner: lawyerhouse
--

CREATE SEQUENCE public."CLIENT_client_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CLIENT_client_id_seq" OWNER TO lawyerhouse;

--
-- Name: CLIENT_client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lawyerhouse
--

ALTER SEQUENCE public."CLIENT_client_id_seq" OWNED BY public."CLIENT".client_id;


--
-- Name: LAWYER; Type: TABLE; Schema: public; Owner: lawyerhouse
--

CREATE TABLE public."LAWYER" (
    laywer_id integer NOT NULL,
    fname character varying NOT NULL,
    lname character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    date_registered timestamp with time zone NOT NULL,
    lawyer_type public.lawyer_type NOT NULL,
    status public.staff_status NOT NULL
);


ALTER TABLE public."LAWYER" OWNER TO lawyerhouse;

--
-- Name: LAWYER_laywer_id_seq; Type: SEQUENCE; Schema: public; Owner: lawyerhouse
--

CREATE SEQUENCE public."LAWYER_laywer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LAWYER_laywer_id_seq" OWNER TO lawyerhouse;

--
-- Name: LAWYER_laywer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lawyerhouse
--

ALTER SEQUENCE public."LAWYER_laywer_id_seq" OWNED BY public."LAWYER".laywer_id;


--
-- Name: SECRETARY; Type: TABLE; Schema: public; Owner: lawyerhouse
--

CREATE TABLE public."SECRETARY" (
    secretary_id integer NOT NULL,
    fname character varying NOT NULL,
    lname character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    date_registered timestamp with time zone NOT NULL,
    status public.staff_status NOT NULL
);


ALTER TABLE public."SECRETARY" OWNER TO lawyerhouse;

--
-- Name: SECRETARY_secretary_id_seq; Type: SEQUENCE; Schema: public; Owner: lawyerhouse
--

CREATE SEQUENCE public."SECRETARY_secretary_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SECRETARY_secretary_id_seq" OWNER TO lawyerhouse;

--
-- Name: SECRETARY_secretary_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lawyerhouse
--

ALTER SEQUENCE public."SECRETARY_secretary_id_seq" OWNED BY public."SECRETARY".secretary_id;


--
-- Name: CLIENT client_id; Type: DEFAULT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."CLIENT" ALTER COLUMN client_id SET DEFAULT nextval('public."CLIENT_client_id_seq"'::regclass);


--
-- Name: LAWYER laywer_id; Type: DEFAULT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."LAWYER" ALTER COLUMN laywer_id SET DEFAULT nextval('public."LAWYER_laywer_id_seq"'::regclass);


--
-- Name: SECRETARY secretary_id; Type: DEFAULT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."SECRETARY" ALTER COLUMN secretary_id SET DEFAULT nextval('public."SECRETARY_secretary_id_seq"'::regclass);


--
-- Data for Name: CLIENT; Type: TABLE DATA; Schema: public; Owner: lawyerhouse
--

COPY public."CLIENT" (client_id, fname, lname, email, password, date_registered) FROM stdin;
1	Fahd	Ali	fahd@client.com	fahd123	2024-01-16 08:02:47.168825+08
2	Laila	Waleed	laila@client.com	laila123	2024-01-16 08:02:47.170825+08
\.


--
-- Data for Name: LAWYER; Type: TABLE DATA; Schema: public; Owner: lawyerhouse
--

COPY public."LAWYER" (laywer_id, fname, lname, email, password, date_registered, lawyer_type, status) FROM stdin;
1	Hazem	Ahmed	hazem@lawyer.com	pass	2024-01-15 12:21:30.589427+08	PARTNER	ACTIVE
2	Mohammed	Ali	mohamed@lawyer.com	pass	2024-01-15 14:25:54.305247+08	PARALEGAL	ACTIVE
3	Rayyan	Abdullah	rayyan@lawyer.com	rayyan123	2024-01-16 21:44:41.433597+08	PARALEGAL	ACTIVE
\.


--
-- Data for Name: SECRETARY; Type: TABLE DATA; Schema: public; Owner: lawyerhouse
--

COPY public."SECRETARY" (secretary_id, fname, lname, email, password, date_registered, status) FROM stdin;
1	Khalil	Lee	khalil@secretary.com	khalil123	2024-01-16 08:02:47.170825+08	ACTIVE
2	Bilal	Ramy	bilal@secretary.com	bilal123	2024-01-16 08:02:47.171826+08	ACTIVE
\.


--
-- Name: CLIENT_client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lawyerhouse
--

SELECT pg_catalog.setval('public."CLIENT_client_id_seq"', 2, true);


--
-- Name: LAWYER_laywer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lawyerhouse
--

SELECT pg_catalog.setval('public."LAWYER_laywer_id_seq"', 3, true);


--
-- Name: SECRETARY_secretary_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lawyerhouse
--

SELECT pg_catalog.setval('public."SECRETARY_secretary_id_seq"', 2, true);


--
-- Name: CLIENT CLIENT_pkey; Type: CONSTRAINT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."CLIENT"
    ADD CONSTRAINT "CLIENT_pkey" PRIMARY KEY (client_id);


--
-- Name: CLIENT CLIENT_unique; Type: CONSTRAINT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."CLIENT"
    ADD CONSTRAINT "CLIENT_unique" UNIQUE (email);


--
-- Name: LAWYER LAWYER_pkey; Type: CONSTRAINT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."LAWYER"
    ADD CONSTRAINT "LAWYER_pkey" PRIMARY KEY (laywer_id);


--
-- Name: LAWYER LAWYER_unique; Type: CONSTRAINT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."LAWYER"
    ADD CONSTRAINT "LAWYER_unique" UNIQUE (email);


--
-- Name: SECRETARY SECRETARY_pkey; Type: CONSTRAINT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."SECRETARY"
    ADD CONSTRAINT "SECRETARY_pkey" PRIMARY KEY (secretary_id);


--
-- Name: SECRETARY SECRETARY_unique; Type: CONSTRAINT; Schema: public; Owner: lawyerhouse
--

ALTER TABLE ONLY public."SECRETARY"
    ADD CONSTRAINT "SECRETARY_unique" UNIQUE (email);


--
-- PostgreSQL database dump complete
--

