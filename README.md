# Shopping Website with useReducer & localStorage

This project is a simple shopping website built with React, showcasing how to combine `useReducer` and `localStorage` to manage state and persist data across sessions. By using `useReducer` for state management and `localStorage` for persistence, we create a single, cohesive store for handling actions and state.

## Key Concepts

### 1. useReducer for State Management
In this project, `useReducer` is used to manage the state of the shopping cart and other application data. It provides a clean and structured way to update the state by dispatching actions. The reducer function listens for these actions and updates the state accordingly, ensuring predictable and scalable state management.

### 2. localStorage for Persistence
We leverage `localStorage` to automatically save the state (e.g., the shopping cart, user preferences) between page reloads and browser sessions. This ensures that users can return to their shopping without losing their previous selections or progress.

### 3. Single Store and Actions Center
By combining `useReducer` with `localStorage`, we maintain a single source of truth for the state of the application. All state changes (such as adding/removing products from the cart, updating user info, etc.) are handled through a single store, which also automatically syncs with `localStorage`.

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/Ox09/ShoeSphere_ft_useReducer.git
    ```
2. Navigate to the project directory:
    ```sh
    cd main
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm run dev
    ```

## Examples

### Managing the Cart
When you add a product to the cart or remove a product from the cart, an action is dispatched to the reducer, which updates the state and saves it to `localStorage`.

## Contributing

We welcome contributions! Just put your opinions* in the comments, anything about bug fixes or request additional features.

