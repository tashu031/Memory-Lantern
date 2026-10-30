// LocalStorage Management for Memory Lantern

const MEMORIES_KEY = "memory_lantern_memories";
const OFRENDA_CANDLES_KEY = "memory_lantern_ofrenda_candles";

// Sample memories to give the garden life upon initial launch
export const INITIAL_SAMPLE_MEMORIES = [
  {
    id: "sample-elena-1",
    name: "Abuelita Elena",
    relationship: "Grandmother",
    description: "The matriarch of our Sunday dinners, who grew the most vibrant marigolds in town.",
    favorite_memories: "Early mornings in the kitchen humming classic boleros while making fresh spiced hot chocolate and conchas for all the grandchildren.",
    favorite_food: "Warm conchas and spiced chocolate caliente",
    favorite_music: "Classic boleros and Trio Los Panchos",
    special_qualities: "Her boundless warmth, gentle laughter, and the ability to make anyone feel completely loved and safe.",
    date_or_occasion: "Día de los Muertos & Sunday mornings",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    isCandleLit: true,
    candleLitAt: new Date().toISOString(),
    tributes: [
      {
        id: "trib-1",
        tribute: "Dear Abuelita Elena,\n\nEvery time the autumn breeze carries the sweet scent of cinnamon and warm bread, my thoughts fly straight back to your sunlit kitchen. Your laughter was our family's compass, guiding us through quiet moments and noisy feasts alike.\n\nThank you for teaching us that love is something you fold into every recipe, every hug, and every quiet prayer. Your lantern burns forever bright in our hearts.",
        type: "letter",
        style: "Heartfelt",
        model: "gemma3:1b",
        date: new Date().toISOString(),
      }
    ]
  },
  {
    id: "sample-arthur-2",
    name: "Arthur 'Papa Art' Pendelton",
    relationship: "Father & Mentor",
    description: "An astronomer and carpenter who taught everyone how to look up at the stars and build with patient hands.",
    favorite_memories: "Setting up the telescope on the back porch during August meteor showers, drinking black coffee while counting falling stars together.",
    favorite_food: "Wild blackberry pie and black pour-over coffee",
    favorite_music: "Miles Davis, jazz trumpet, and acoustic blues",
    special_qualities: "Unflappable patience, curiosity about the cosmos, and always having a pencil tucked behind his ear.",
    date_or_occasion: "Perseid Meteor Shower Night",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    isCandleLit: true,
    candleLitAt: new Date().toISOString(),
    tributes: []
  }
];

export function getMemories() {
  try {
    const raw = localStorage.getItem(MEMORIES_KEY);
    if (!raw) {
      // Seed with sample memories if empty
      localStorage.setItem(MEMORIES_KEY, JSON.stringify(INITIAL_SAMPLE_MEMORIES));
      return INITIAL_SAMPLE_MEMORIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read memories from LocalStorage:", err);
    return [];
  }
}

export function saveMemory(memoryData) {
  try {
    const memories = getMemories();
    const newMemory = {
      ...memoryData,
      id: memoryData.id || "mem-" + Date.now() + "-" + Math.random().toString(36).substr(2, 6),
      createdAt: memoryData.createdAt || new Date().toISOString(),
      isCandleLit: memoryData.isCandleLit || false,
      candleLitAt: memoryData.candleLitAt || null,
      tributes: memoryData.tributes || [],
    };
    memories.unshift(newMemory);
    localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
    return newMemory;
  } catch (err) {
    console.error("Failed to save memory to LocalStorage:", err);
    throw err;
  }
}

export function updateMemory(id, updatedFields) {
  try {
    const memories = getMemories();
    const index = memories.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Memory with id ${id} not found.`);
    }
    memories[index] = {
      ...memories[index],
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
    return memories[index];
  } catch (err) {
    console.error("Failed to update memory in LocalStorage:", err);
    throw err;
  }
}

export function deleteMemory(id) {
  try {
    const memories = getMemories();
    const filtered = memories.filter((m) => m.id !== id);
    localStorage.setItem(MEMORIES_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error("Failed to delete memory from LocalStorage:", err);
    throw err;
  }
}

export function getMemoryById(id) {
  const memories = getMemories();
  return memories.find((m) => m.id === id) || null;
}

export function toggleCandle(id) {
  try {
    const memories = getMemories();
    const index = memories.findIndex((m) => m.id === id);
    if (index === -1) return null;

    const currentStatus = !!memories[index].isCandleLit;
    memories[index].isCandleLit = !currentStatus;
    memories[index].candleLitAt = !currentStatus ? new Date().toISOString() : null;

    localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
    return memories[index];
  } catch (err) {
    console.error("Failed to toggle candle:", err);
    return null;
  }
}

export function saveTributeToMemory(memoryId, tributeItem) {
  try {
    const memories = getMemories();
    const index = memories.findIndex((m) => m.id === memoryId);
    if (index === -1) return null;

    if (!memories[index].tributes) {
      memories[index].tributes = [];
    }
    const fullTribute = {
      id: "trib-" + Date.now(),
      date: new Date().toISOString(),
      ...tributeItem,
    };
    memories[index].tributes.unshift(fullTribute);
    localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
    return fullTribute;
  } catch (err) {
    console.error("Failed to save tribute to memory:", err);
    return null;
  }
}
