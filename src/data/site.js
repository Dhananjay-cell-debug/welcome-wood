// Presentation content is deliberately separate from the page layouts.
// Replace these studies with approved project records when the client supplies them.
export const contact = {
  email: "welcomewoods786@gmail.com",
  phone: "+91 99607 77033",
  tel: "+919960777033",
  name: "Mahiuddin",
};

export const navigation = [
  { label: "Home", href: "#/", image: "/ref/ref-living-tall.jpg" },
  { label: "The Studio", href: "#/studio", image: "/ref/ref-detail-1.jpg" },
  { label: "Our Expertise", href: "#/services", image: "/ref/ref-kitchen.jpg" },
  {
    label: "Selected Spaces",
    href: "#/projects",
    image: "/ref/ref-living-warm.jpg",
  },
  { label: "The Process", href: "#/process", image: "/ref/ref-staircase.jpg" },
  {
    label: "Start a Project",
    href: "#/contact",
    image: "/ref/ref-living-dusk.jpg",
  },
];

export const services = [
  {
    id: "residential",
    n: "01",
    title: "Residential interiors",
    short: "A place that feels like you.",
    image: "/ref/ref-bedroom.jpg",
    description:
      "Rooms that find a balance between the way you live and the way you want to feel. A considered conversation between light, proportion, texture and everyday rituals.",
    scope: [
      "Living & dining spaces",
      "Bedrooms & personal spaces",
      "Kitchens & integrated storage",
    ],
    note: "For apartments, independent homes and private residences.",
  },
  {
    id: "commercial",
    n: "02",
    title: "Commercial interiors",
    short: "Spaces with a sense of purpose.",
    image: "/ref/ref-lounge.jpg",
    description:
      "An environment is part of how a business introduces itself. Explore a space shaped around its people, its practical needs and the character of its brand.",
    scope: [
      "Spatial identity",
      "Customer & team experience",
      "Furniture & finish direction",
    ],
    note: "Tell us about your business and the space you have in mind.",
  },
  {
    id: "planning",
    n: "03",
    title: "Space planning",
    short: "Every square foot, considered.",
    image: "/ref/ref-dining.jpg",
    description:
      "Good spaces begin with good relationships: between rooms, furniture, movement and light. Planning brings these decisions together before the details follow.",
    scope: [
      "Room layouts & circulation",
      "Furniture placement",
      "Storage & functional zoning",
    ],
    note: "A thoughtful starting point for a new space or a fresh perspective.",
  },
  {
    id: "styling",
    n: "04",
    title: "Interior styling",
    short: "The details that make it yours.",
    image: "/ref/ref-detail-2.jpg",
    description:
      "The last layer brings a room to life. Materials, furniture, textiles, lighting and objects work together to give a space its own quiet character.",
    scope: [
      "Material & colour palettes",
      "Furniture & lighting direction",
      "Textiles, objects & finishing touches",
    ],
    note: "A complete visual language, down to the smallest detail.",
  },
  {
    id: "execution",
    n: "05",
    title: "Construction & execution",
    short: "From an idea to a lived-in space.",
    image: "/ref/ref-staircase.jpg",
    description:
      "A dedicated conversation about the work on site: the proposed scope, the sequence of activities, material decisions and how the space comes together.",
    scope: [
      "Construction requirements",
      "Interior execution",
      "Project coordination",
    ],
    note: "Detailed delivery scope will be agreed for each project.",
  },
];

export const projects = [
  {
    slug: "a-quieter-kind-of-home",
    number: "01",
    title: "A quieter kind of home",
    category: "Residential interiors",
    image: "/ref/ref-living-tall.jpg",
    portrait: "/ref/ref-bedroom.jpg",
    detail: "/ref/ref-detail-1.jpg",
    wide: "/ref/ref-living-dusk.jpg",
    caption: "Natural light. Honest materials. Room to breathe.",
    theme: "Light, as a way of living.",
    summary:
      "A residential design study exploring warm timber, soft mineral tones and generous natural light. The layout shows how a future Welcome Woods project can unfold as a complete visual story.",
    brief:
      "Imagine a home that feels restful from the moment you arrive. Open living spaces give way to more intimate rooms, with a consistent palette that connects the two.",
    approach:
      "A restrained material palette allows the changing light to become part of the interior. Storage, furniture and circulation are considered together, leaving space for life to happen.",
    materials: ["Warm timber", "Natural stone", "Soft linen"],
    position: "center 58%",
  },
  {
    slug: "the-art-of-gathering",
    number: "02",
    title: "The art of gathering",
    category: "Living & dining",
    image: "/ref/ref-dining.jpg",
    portrait: "/ref/ref-living-warm.jpg",
    detail: "/ref/ref-detail-2.jpg",
    wide: "/ref/ref-kitchen.jpg",
    caption: "Spaces that bring people a little closer.",
    theme: "Made for the moments between.",
    summary:
      "An interior study of shared spaces, from the kitchen to the dining table. This is a sample case-study layout, ready for the client’s approved project images and story.",
    brief:
      "Consider the everyday rituals that bring people together: preparing a meal, sharing a table, or settling into an unhurried evening.",
    approach:
      "A continuous palette creates a natural conversation between kitchen, dining and living. Layered lighting and tactile finishes bring intimacy to generous proportions.",
    materials: ["Timber joinery", "Textured upholstery", "Brushed metal"],
    position: "center",
  },
  {
    slug: "a-considered-workspace",
    number: "03",
    title: "A considered workspace",
    category: "Space planning",
    image: "/ref/ref-lounge.jpg",
    portrait: "/ref/ref-living-tall.jpg",
    detail: "/ref/ref-detail-3.jpg",
    wide: "/ref/ref-wide.jpg",
    caption: "A balance of focus, flow and human comfort.",
    theme: "A different rhythm of work.",
    summary:
      "A spatial study exploring comfortable places to focus, meet and pause. Reference imagery illustrates the direction; this is not a completed Welcome Woods project.",
    brief:
      "A workspace should support different ways of spending the day. Think quiet focus, easy conversation and the transitions in between.",
    approach:
      "Clear circulation and a warm material language give each zone its purpose while keeping the whole environment connected.",
    materials: ["Natural textures", "Warm neutrals", "Soft lighting"],
    position: "center",
  },
];

export const process = [
  {
    n: "01",
    title: "A conversation",
    subtitle: "It begins with listening.",
    body: "Tell us about your space, how you use it, what you love and what you would like to change. Share a location, a few ideas and your priorities.",
    deliverable: "Your aspirations & initial project brief",
    image: "/ref/ref-living-dusk.jpg",
  },
  {
    n: "02",
    title: "Understanding the space",
    subtitle: "Before the first line is drawn.",
    body: "Discuss the site, its possibilities and its practical constraints. Existing plans, photographs and measurements help shape a clear starting point.",
    deliverable: "Site context & requirements",
    image: "/ref/ref-wide.jpg",
  },
  {
    n: "03",
    title: "Shaping the direction",
    subtitle: "Ideas find their form.",
    body: "Explore layouts, references, materials and the feeling of the space. Bring the functional requirements and visual direction into one conversation.",
    deliverable: "Layout & material direction",
    image: "/ref/ref-detail-1.jpg",
  },
  {
    n: "04",
    title: "Agreeing the details",
    subtitle: "Clarity before commitment.",
    body: "Review the proposed scope, estimate, responsibilities and programme together. The exact service and delivery terms are agreed for your project.",
    deliverable: "Agreed scope, estimate & programme",
    image: "/ref/ref-kitchen.jpg",
  },
  {
    n: "05",
    title: "Bringing it to life",
    subtitle: "Where the details come together.",
    body: "Follow the work as it takes shape on site. Material decisions, coordination and reviews connect the approved direction to the finished space.",
    deliverable: "Site coordination & progress reviews",
    image: "/ref/ref-staircase.jpg",
  },
  {
    n: "06",
    title: "The final layer",
    subtitle: "Ready for your everyday.",
    body: "Walk through the space together, review the finishing details and discuss the information you need to settle in.",
    deliverable: "Final walkthrough & handover",
    image: "/ref/ref-bedroom.jpg",
  },
];

export const faqs = [
  [
    "What should I share in my first enquiry?",
    "Start with the type of space, its location and what you would like help with. A floor plan, approximate area, a few references and an indicative budget are useful if you have them.",
  ],
  [
    "Can I discuss both interiors and execution?",
    "Yes. Tell us which parts of the project you would like to discuss. The team can clarify the services, responsibilities and delivery scope appropriate to your project.",
  ],
  [
    "How are the budget and timeline decided?",
    "These depend on the size, condition and scope of the space, along with material selections and site requirements. Discuss an estimate and programme with the team before work is agreed.",
  ],
  [
    "Can I enquire about a project outside Mumbai?",
    "Share the city and location in your enquiry. The team will confirm availability and arrangements for your specific project.",
  ],
];
