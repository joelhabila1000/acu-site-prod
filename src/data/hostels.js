// Hostel catalogue for the public accommodation page.
//
// The list of halls, their rooms and live bed availability is served by the API
// (GET /api/hostels). When the API is unreachable — local development without
// the server running, or a static deploy — the bundled sample below keeps the
// page complete instead of blank.

import { useEffect, useState } from "react";
import { apiGet } from "../lib/api.js";

import crowtherHall from "../assets/Buildings/Crowther Hall.JPG";
import bishopHall from "../assets/Buildings/Bishop Melvile Jones BH.JPG";
import jahHostel from "../assets/Buildings/JAH boys Hostel.JPG";
import femaleHostel from "../assets/Buildings/UFH.JPG";
import complex from "../assets/Buildings/Complex.JPG";

export const FALLBACK_IMAGES = [
  crowtherHall,
  bishopHall,
  jahHostel,
  femaleHostel,
  complex,
];

export const FALLBACK_HOSTELS = [
  {
    id: "sample-crowther",
    name: "Crowther Hall",
    slug: "crowther-hall",
    gender: "female",
    description:
      "A long-standing hall of residence for female students, close to the central lecture rooms and the chapel, with warden supervision and study-friendly quiet hours.",
    image: crowtherHall,
    location: "Main Campus",
    status: "active",
    roomCount: 24,
    bedCount: 96,
    availableBeds: 18,
  },
  {
    id: "sample-bishop",
    name: "Bishop Melville Jones Hall",
    slug: "bishop-melville-jones-hall",
    gender: "male",
    description:
      "A spacious male hall with furnished rooms, shared facilities and easy access to the sports fields and the student centre.",
    image: bishopHall,
    location: "Main Campus",
    status: "active",
    roomCount: 30,
    bedCount: 120,
    availableBeds: 27,
  },
  {
    id: "sample-jah",
    name: "JAH Hostel",
    slug: "jah-hostel",
    gender: "male",
    description:
      "A modern male hostel block offering comfortable rooms and a calm environment designed to support focused study.",
    image: jahHostel,
    location: "North Campus",
    status: "active",
    roomCount: 20,
    bedCount: 80,
    availableBeds: 12,
  },
  {
    id: "sample-ufh",
    name: "University Female Hostel",
    slug: "university-female-hostel",
    gender: "female",
    description:
      "The University Female Hostel provides secure, well-supervised accommodation with shared common areas for female undergraduates.",
    image: femaleHostel,
    location: "Main Campus",
    status: "active",
    roomCount: 26,
    bedCount: 104,
    availableBeds: 21,
  },
  {
    id: "sample-complex",
    name: "Postgraduate Complex",
    slug: "postgraduate-complex",
    gender: "mixed",
    description:
      "Purpose-built accommodation for postgraduate students, with quieter surroundings suited to research and evening study.",
    image: complex,
    location: "Postgraduate School",
    status: "active",
    roomCount: 16,
    bedCount: 48,
    availableBeds: 9,
  },
];

export const GENDER_LABELS = {
  male: "Male hall",
  female: "Female hall",
  mixed: "Mixed hall",
};

function bedsOf(hostel) {
  if (!Array.isArray(hostel.rooms)) return [];
  return hostel.rooms.flatMap((room) =>
    Array.isArray(room.beds) ? room.beds : [],
  );
}

// Normalises a row from GET /api/hostels and fills the gaps with fallback
// imagery and counts so the card layout never has to guard against them.
function mapHostel(row, index) {
  const beds = bedsOf(row);
  const rooms = Array.isArray(row.rooms) ? row.rooms : [];
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    gender: row.gender || "mixed",
    description: row.description || "",
    image: row.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    location: row.location || "Main Campus",
    status: row.status || "active",
    roomCount: typeof row.roomCount === "number" ? row.roomCount : rooms.length,
    bedCount: typeof row.bedCount === "number" ? row.bedCount : beds.length,
    availableBeds:
      typeof row.availableBeds === "number"
        ? row.availableBeds
        : beds.filter((bed) => bed.status === "available").length,
  };
}

export function useHostels() {
  const [hostels, setHostels] = useState(FALLBACK_HOSTELS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    apiGet("/api/hostels")
      .then((res) => {
        if (cancelled) return;
        const rows = Array.isArray(res && res.data) ? res.data : [];
        if (rows.length) setHostels(rows.map(mapHostel));
      })
      .catch(() => {
        /* keep the bundled fallback */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { hostels, loading };
}
