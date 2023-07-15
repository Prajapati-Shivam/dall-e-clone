
# Imagery - DALL-E Clone

This repository contains a DALL-E Clone project, which aims to replicate the functionality of OpenAI's DALL·E model. DALL·E is a deep learning model that generates images from textual descriptions.

## Features

- Generate images based on textual prompts.
- Interactive user interface to enter prompts and view generated images.
- Random prompt generator for surprise prompts.
- Download the generated images.

## Technologies Used

- React.js: Frontend JavaScript library for building user interfaces.
- OpenAI API: Used for generating images based on textual prompts.
- FileSaver: Library for saving files on the client-side.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Prajapati-Shivam/dall-e-clone.git
   ```

2. Install the dependencies:

   ```bash
   cd dall-e-clone
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variable:

     ```
     REACT_APP_RAPID_API_KEY=YOUR_RAPIDAPI_KEY
     ```

     Replace `YOUR_RAPIDAPI_KEY` with your RapidAPI key for the DALL·E API.

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to see the application.

## Usage

- Enter a prompt in the input field to generate an image based on that prompt.
- Click the "Surprise Me" button to get a random prompt.
- Generated images will be displayed in the image preview area.
- Click the "Download" button to download the generated image.

## Contributing

Contributions to this project are welcome. Feel free to open issues or submit pull requests with any improvements or bug fixes you'd like to contribute.

