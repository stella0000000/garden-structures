## 🌸 𝓈ℴ𝒻𝓉𝓌𝒶𝓇ℯ ℊ𝒶𝓇𝒹ℯ𝓃𝒾𝓃ℊ 🌱

[This project is in progress.]

### `Motivation`<br>

Ben, Stella, and Zack met at the Recurse Center during Daily Leetcode! They have backgrounds in 3D/mathematics, research/teaching, and art/writing, respectively.<br><br>

Stella observed the paper flowers hanging behind her desk, and wondered: can flower petals be drawn as nodes of a doubly circularly linked list?<br><br>

The trio decided to collaborate on a project inviting users to explore the world of data structures and algorithms through the lens of nature. The project is unfolding as a video game.<br><br>
<img width="700" alt="Screenshot 2023-10-19 at 8 40 26 PM" src="https://github.com/stella0000000/garden-structures/assets/112890821/18dbb75d-a312-4e2b-a7c3-3a54fa63b43d">


### `Technologies`<br>

- TypeScript
- React Three Fiber (3D)
- Vite
- Vercel

### `Functionalities`<br>

- Under the hood, data structures are implemented and rendered as plants in React
- A global context carries the `PlantCollection`
- A constellation is implemented as a graph, and the stars sparkle toggling between DFS / BFS
- Performance is heavily considered throughout the site, e.g. avoid reinitializing meshes upholding modularity
- A raycaster is used to add plants at the user's pointer location - a temporary `ghost plant` is connected to the ground for its position to be controlled by the user's field of view

### `Ongoing and future considerations`<br>

- Toggle: data structure / natural vision
- We need trees
- UX minimizing menu assistance, and clicking
- Backend database
- Websockets for collaborative gardening
- Visit your friend's gardens
