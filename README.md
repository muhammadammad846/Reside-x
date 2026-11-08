# ResideX – Property Rental Platform

ResideX is a luxury accommodation and rental platform designed to connect guests, hosts, and administrators in one system. The website allows people to browse premium properties, book stays, manage listings, and monitor platform activity through role-based dashboards. The project is built using Next.js and focuses on a clean user experience, modern property browsing, and a simple demo login flow.

## Project Overview

The application is structured around three main user roles:

- Guest
- Host
- Admin

Each role has its own dashboard and responsibilities. The project simulates a real property marketplace where users interact with the platform according to their needs and permissions.

## Main Purpose of the Website

ResideX acts like a premium rental marketplace for villas, apartments, retreats, and high-end stays. Guests can search properties, filter by price or type, and book travel accommodations. Hosts can list properties and track their bookings and earnings. Admins can manage users, monitor platform performance, and oversee all activity from one central dashboard.

## How the Website Works

### 1. Landing page
The homepage introduces the brand and gives users a clear path to sign in, register, or explore the service. It presents ResideX as a luxury rental marketplace that offers premium property experiences.

### 2. Registration page
The registration page allows a new user to create an account and select a role. Users can choose between Guest and Host. After registration, they are redirected to the corresponding dashboard.

### 3. Login system
The login page includes demo accounts for quick testing. Each user logs in with a predetermined email and password and is automatically redirected to the correct dashboard based on role.

### 4. Role-based dashboards
The platform uses local storage to simulate user authentication. The user record stores the selected role, and the dashboard checks that role before allowing access. This means guests cannot access host or admin panels, and the same is true for other roles.

## User Roles and Their Functions

### Guest Role
Guests are end users who want to rent properties. Their dashboard allows them to:

- search for properties by name or location
- filter properties by type and budget
- view property details such as price, bedrooms, bathrooms, and guest capacity
- check if a property is available before booking
- submit booking requests
- view their bookings and booking history
- manage saved or favorite properties
- update their personal profile information

The guest dashboard is designed for a renter who wants a simple and convenient experience when exploring and booking luxury stays.

### Host Role
Hosts are property owners or managers who want to list their homes and earn revenue. Their dashboard allows them to:

- add new properties to the platform
- edit property details such as title, price, location, and capacity
- pause or activate listings
- delete old or unavailable properties
- track total bookings and occupancy
- monitor earnings from listed properties
- view average property ratings and performance
- manage bookings received from guests

The host dashboard helps owners run and monitor their property listings in an efficient, business-focused way.

### Admin Role
Admins oversee the complete platform. Their dashboard allows them to:

- view overall platform metrics and key numbers
- see total hosts, guests, bookings, and revenue
- manage host accounts by activating or suspending them
- remove or manage guest records
- monitor platform activity and suspicious actions
- review listing and booking trends
- see a summary of payouts and platform performance

The admin dashboard is used to maintain quality, security, and control over the entire marketplace.

## Key Features of the Project

- modern landing page for a luxury property marketplace
- role-based login and registration flow
- guest property browsing and booking interface
- host property management dashboard
- admin analytics dashboard
- responsive and premium dark UI design
- rich use of cards, tables, tabs, and property layouts
- mock data to simulate a real working app without a backend

## Frontend Stack

This project is built using:

- Next.js
- React
- JavaScript
- CSS styling with custom design patterns
- localStorage for demo user session handling

## Demo Credentials

The application includes demo login accounts for testing:

- Guest: guest@residex.com / guest123
- Host: host@residex.com / host123
- Admin: admin@residex.com / admin123

These credentials are hardcoded in the demo login page so the app can simulate different user flows during development.

## Current Project Status

The website is a frontend demo and prototype. It does not yet include a real database or API backend. Instead, it uses mock data and local browser storage to represent authentication and role-based access. This makes it useful for demonstrating the concept, user flow, and dashboard design to users or project reviewers.

## Summary

ResideX is a luxury rental platform that demonstrates how a real booking marketplace can work. Guests explore and book desirable properties, hosts manage listings and income, and admins keep the platform running smoothly. The project is a strong front-end concept for a property rental website and is designed to showcase role-based user flows, demo authentication, and polished dashboard interfaces.
