/**
 * Forum seed bundle — wires Lexical sample bodies, Unsplash URLs, and comment graphs.
 * Consumed only by {@link MockForumRepository}; app code uses `getForumRepository()` from `@/data/forum` (not this file directly).
 */
import type { SerializedEditorState } from "lexical";
import { EXPLORE_CATEGORIES } from "@/domain/forum/explore-categories";
import { buildUnsplashUrl } from "@/lib/media/unsplash-url";
import type {
  Community,
  ForumComment,
  ForumPost,
  ForumUser,
  RecommendedCourse,
} from "@/types/forum";

const us = buildUnsplashUrl;

const sampleLexicalBody = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Welcome to the course discussion! This copy is stored as Lexical JSON so it drops straight into Payload’s richText field.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Use the toolbar in “Add Post” for bold, lists, quotes, and links — the editor is Lexical-first for Payload 3.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as const;

export const sampleBody: SerializedEditorState =
  sampleLexicalBody as unknown as SerializedEditorState;

const users: Record<string, ForumUser> = {
  dave: {
    id: "u1",
    name: "Dave Devonshire",
    avatarUrl: us("photo-1472099645785-5658abf4ff4e", 128),
  },
  lauren: {
    id: "u2",
    name: "Lauren Metcalfe",
    avatarUrl: us("photo-1494790108377-be9c29b29330", 128),
  },
  peter: {
    id: "u3",
    name: "Peter Student",
    avatarUrl: us("photo-1558618666-fcd25c85cd64", 128),
  },
  maya: {
    id: "u4",
    name: "Maya Chen",
    avatarUrl: us("photo-1438761681033-6461ffad8d80", 128),
  },
  james: {
    id: "u5",
    name: "James Okonkwo",
    avatarUrl: us("photo-1492562080023-ab3db95bfbce", 128),
  },
  sofia: {
    id: "u6",
    name: "Sofia Alvarez",
    avatarUrl: us("photo-1544005313-94ddf0286df2", 128),
  },
  oliver: {
    id: "u7",
    name: "Oliver Grant",
    avatarUrl: us("photo-1500648767791-00dcc994a43e", 128),
  },
  nina: {
    id: "u8",
    name: "Nina Park",
    avatarUrl: us("photo-1534528741775-53994a69daeb", 128),
  },
  alex: {
    id: "u9",
    name: "Alex Rivera",
    avatarUrl: us("photo-1506794778202-cad84cf45f1d", 128),
  },
  emma: {
    id: "u10",
    name: "Emma Wilson",
    avatarUrl: us("photo-1487412720507-e7ab37603c6f", 128),
  },
  chris: {
    id: "u11",
    name: "Chris Taylor",
    avatarUrl: us("photo-1522071820081-009f0129c71c", 128),
  },
  zara: {
    id: "u12",
    name: "Zara Ahmed",
    avatarUrl: us("photo-1580489944761-15a19d654956", 128),
  },
};

const U = users;

export const communities: Community[] = [
  {
    id: "c1",
    slug: "crochet",
    handle: "oas/Crochet",
    description:
      "Patterns, yarn swaps, and work-in-progress shots — friendly chat for crocheters at every level.",
    memberCount: 42,
    imageUrl: us("photo-1606107557195-0e29a4b5b4aa", 400),
    category: "Craft",
  },
  {
    id: "c2",
    slug: "photographybasics",
    handle: "oas/photographybasics",
    description:
      "Official space for Photography Basics learners — assignments, gear questions, and peer feedback.",
    memberCount: 412,
    studentsOnly: true,
    imageUrl: us("photo-1516035069371-29a1b244cc32", 400),
    category: "Photography",
  },
  {
    id: "c3",
    slug: "digitalphotography",
    handle: "oas/digitalphotography",
    description:
      "Official space for Digital Photography learners — exposure, lenses, editing, and kit advice with classmates.",
    memberCount: 892,
    studentsOnly: true,
    imageUrl: us("photo-1502920917128-1aa500764cbd", 400),
    category: "Photography",
  },
  {
    id: "c4",
    slug: "discomoves",
    handle: "oas/discomoves",
    description:
      "Share playlists, footwork, and floor fills — a light-hearted home for disco and funk dancers.",
    memberCount: 156,
    imageUrl: us("photo-1540575467063-178a50c2df87", 400),
    category: "Dance",
  },
  {
    id: "c5",
    slug: "spraypainting",
    handle: "oas/spraypainting",
    description:
      "Caps, cans, colour layers, and legal walls — technique talk and inspiration for spray artists.",
    memberCount: 334,
    imageUrl: us("photo-1561214115-f2f134cc4912", 400),
    category: "Art",
  },
  {
    id: "c6",
    slug: "oilpainting",
    handle: "oas/oilpainting",
    description:
      "Classical and contemporary oils — colour mixing, mediums, and studio setups for all skill levels.",
    memberCount: 521,
    imageUrl: us("photo-1579783902614-a3fb3927b6a5", 400),
    category: "Art",
  },
  {
    id: "c7",
    slug: "yoga-mindfulness",
    handle: "oas/yoga-mindfulness",
    description:
      "Movement, breathwork, and mindfulness on the mat — share routines and stay accountable.",
    memberCount: 1203,
    imageUrl: us("photo-1544367567-0f2fcb009e0b", 400),
    category: "Body And Mind",
  },
  {
    id: "c8",
    slug: "illustration-daily",
    handle: "oas/illustration-daily",
    description:
      "Daily drawing prompts, digital and traditional tools, and constructive portfolio critiques.",
    memberCount: 678,
    imageUrl: us("photo-1513364776144-60967b0f800f", 400),
    category: "Illustration",
  },
  {
    id: "c9",
    slug: "slow-living",
    handle: "oas/slow-living",
    description:
      "Routines, rest, and creative balance — habits that support your practice without the hustle cult.",
    memberCount: 289,
    imageUrl: us("photo-1506905925346-21bda4d32df4", 400),
    category: "Lifestyle",
  },
  {
    id: "c10",
    slug: "music-production",
    handle: "oas/music-production",
    description:
      "Course cohort space — DAWs, mixing, monitoring, and plugins from first beat to final bounce.",
    memberCount: 945,
    studentsOnly: true,
    imageUrl: us("photo-1511379938547-c1f69419868d", 400),
    category: "Music",
  },
  {
    id: "c11",
    slug: "videography-gear",
    handle: "oas/videography-gear",
    description:
      "Cameras, gimbals, lights, and editing pipelines — kit talk for shooters and editors.",
    memberCount: 567,
    imageUrl: us("photo-1574717024653-61fd2cf4d44d", 400),
    category: "Videography",
  },
  {
    id: "c12",
    slug: "watercolor-101",
    handle: "oas/watercolor-101",
    description:
      "Companion to Watercolour 101 — washes, paper, brushes, and homework help from classmates.",
    memberCount: 198,
    studentsOnly: true,
    imageUrl: us("photo-1579783902614-a3fb3927b6a5", 400),
    category: "Art",
  },
  {
    id: "c13",
    slug: "pottery-wheel",
    handle: "oas/pottery-wheel",
    description:
      "Companion to Wheel Pottery — throwing, trimming, glazing, and kiln schedules with enrolled students.",
    memberCount: 412,
    studentsOnly: true,
    imageUrl: us("photo-1565193566173-7a0ee3dbe261", 400),
    category: "Craft",
  },
  {
    id: "c14",
    slug: "street-photography",
    handle: "oas/street-photography",
    description:
      "Candid frames, ethics on the pavement, and city guides — street shooting without being a nuisance.",
    memberCount: 723,
    imageUrl: us("photo-1502920917128-1aa500764cbd", 400),
    category: "Photography",
  },
  {
    id: "c15",
    slug: "modern-dance",
    handle: "oas/modern-dance",
    description:
      "Contemporary technique, choreography, and training tips — floor work, jumps, and recovery.",
    memberCount: 267,
    imageUrl: us("photo-1508700929628-666bc8bd84ea", 400),
    category: "Dance",
  },
  {
    id: "c16",
    slug: "guitar-lounge",
    handle: "oas/guitar-lounge",
    description:
      "Acoustic, electric, and bass — tone, technique, gear, and songs you're learning this month.",
    memberCount: 834,
    imageUrl: us("photo-1510915361894-db8b60106cb1", 400),
    category: "Music",
  },
  {
    id: "c17",
    slug: "filmmaking-story",
    handle: "oas/filmmaking-story",
    description:
      "Scripts, storyboards, directing on set, and indie distribution — short films to first features.",
    memberCount: 445,
    imageUrl: us("photo-1574717024653-61fd2cf4d44d", 400),
    category: "Videography",
  },
  {
    id: "c18",
    slug: "creative-writing",
    handle: "oas/creative-writing",
    description:
      "Prompts, drafts, and thoughtful critique — fiction, memoir, and finding time to finish pieces.",
    memberCount: 612,
    imageUrl: us("photo-1481627834876-b7833e8f5570", 400),
    category: "Lifestyle",
  },
];

function daysAgo(d: number): string {
  return new Date(Date.now() - 1000 * 60 * 60 * 24 * d).toISOString();
}

function hoursAgo(h: number): string {
  return new Date(Date.now() - 1000 * 60 * 60 * h).toISOString();
}

function minsAgo(m: number): string {
  return new Date(Date.now() - 1000 * 60 * m).toISOString();
}

type PostSeed = {
  id: string;
  communityId: string;
  title: string;
  excerpt: string;
  author: ForumUser;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  image?: string;
};

const postSeeds: PostSeed[] = [
  { id: "p1", communityId: "c3", title: "This is the best set up I've had.", excerpt: "Finally dialed in lighting and backdrop — sharing what worked.", author: U.dave, createdAt: daysAgo(180), likeCount: 124, commentCount: 12, image: us("photo-1516035069371-29a1b244cc32", 1600, 900) },
  { id: "p2", communityId: "c1", title: "I made the cutest crochet octopuses", excerpt: "What do you think?", author: U.peter, createdAt: minsAgo(4), likeCount: 42, commentCount: 8, image: us("photo-1606107557195-0e29a4b5b4aa", 1600, 900) },
  { id: "p3", communityId: "c14", title: "Rainy London — best lens for low light?", excerpt: "Shot on APS-C, debating a fast prime.", author: U.maya, createdAt: hoursAgo(2), likeCount: 67, commentCount: 15, image: us("photo-1519681393784-d120267933ba", 1600, 900) },
  { id: "p4", communityId: "c10", title: "My first track that actually sounds “finished”", excerpt: "Used only stock plugins — feedback welcome.", author: U.james, createdAt: hoursAgo(6), likeCount: 89, commentCount: 22, image: us("photo-1516280440614-37939bbacd81", 1600, 900) },
  { id: "p5", communityId: "c7", title: "Morning routine that stuck for 30 days", excerpt: "10 minutes, no apps.", author: U.sofia, createdAt: daysAgo(1), likeCount: 201, commentCount: 31, image: us("photo-1544367567-0f2fcb009e0b", 1600, 900) },
  { id: "p6", communityId: "c6", title: "Colour mixing cheat sheet (earth tones)", excerpt: "Burnt sienna + ultramarine = magic.", author: U.oliver, createdAt: daysAgo(3), likeCount: 56, commentCount: 9, image: us("photo-1579783902614-a3fb3927b6a5", 1600, 900) },
  { id: "p7", communityId: "c4", title: "Disco playlist for beginners footwork", excerpt: "Links inside — BPM 115–122.", author: U.nina, createdAt: daysAgo(0), likeCount: 33, commentCount: 6, image: us("photo-1493225457124-a3eb161ffa5f", 1600, 900) },
  { id: "p8", communityId: "c11", title: "Gimbal vs handheld for doc work?", excerpt: "Budget £800 — what would you pick?", author: U.alex, createdAt: hoursAgo(12), likeCount: 44, commentCount: 18, image: us("photo-1574717024653-61fd2cf4d44d", 1600, 900) },
  { id: "p9", communityId: "c8", title: "Line weight exercise — week 4", excerpt: "Posting progress shots.", author: U.emma, createdAt: daysAgo(2), likeCount: 78, commentCount: 11, image: us("photo-1513364776144-60967b0f800f", 1600, 900) },
  { id: "p10", communityId: "c5", title: "Cap comparison on low-pressure cans", excerpt: "Fat cap vs skinny on detail work.", author: U.chris, createdAt: daysAgo(5), likeCount: 19, commentCount: 4, image: us("photo-1561214115-f2f134cc4912", 1600, 900) },
  { id: "p11", communityId: "c16", title: "Barre chords without wrist pain", excerpt: "Finally found a neutral thumb position.", author: U.zara, createdAt: hoursAgo(20), likeCount: 112, commentCount: 27, image: us("photo-1514525253161-7a46d19cd819", 1600, 900) },
  { id: "p12", communityId: "c2", title: "Week 3 homework — histogram critique", excerpt: "Did I clip highlights?", author: U.lauren, createdAt: daysAgo(7), likeCount: 64, commentCount: 14, image: us("photo-1516035069371-29a1b244cc32", 1600, 900) },
  { id: "p13", communityId: "c13", title: "First bowl that didn’t collapse!", excerpt: "Centering clicked after this tip from class.", author: U.peter, createdAt: daysAgo(4), likeCount: 91, commentCount: 19, image: us("photo-1565193566173-7a0ee3dbe261", 1600, 900) },
  { id: "p14", communityId: "c15", title: "Floor work transitions — video inside", excerpt: "Looking for cleaner exits.", author: U.maya, createdAt: hoursAgo(48), likeCount: 27, commentCount: 7, image: us("photo-1515886657613-9f3515b0c78f", 1600, 900) },
  { id: "p15", communityId: "c17", title: "Shot list template for 5-minute shorts", excerpt: "Google Sheet + PDF.", author: U.dave, createdAt: daysAgo(10), likeCount: 155, commentCount: 24, image: us("photo-1574717024653-61fd2cf4d44d", 1600, 900) },
  { id: "p16", communityId: "c9", title: "Digital declutter before the new term", excerpt: "What worked for you?", author: U.sofia, createdAt: daysAgo(6), likeCount: 48, commentCount: 13, image: us("photo-1506905925346-21bda4d32df4", 1600, 900) },
  { id: "p17", communityId: "c18", title: "Flash fiction prompt #12 — “last train”", excerpt: "500 words, mine attached.", author: U.james, createdAt: hoursAgo(3), likeCount: 36, commentCount: 21, image: us("photo-1481627834876-b7833e8f5570", 1600, 900) },
  { id: "p18", communityId: "c3", title: "Mirrorless autofocus for sports — real talk", excerpt: "Compared two bodies at a local match.", author: U.oliver, createdAt: daysAgo(2), likeCount: 73, commentCount: 16, image: us("photo-1502920917128-1aa500764cbd", 1600, 900) },
  { id: "p19", communityId: "c1", title: "Amigurumi eyes — safety vs embroidered", excerpt: "Baby gift, need it toddler-proof.", author: U.nina, createdAt: hoursAgo(8), likeCount: 58, commentCount: 10, image: us("photo-1606107557195-0e29a4b5b4aa", 1600, 900) },
  { id: "p20", communityId: "c10", title: "Sidechain compression without pumping", excerpt: "Four-minute walkthrough.", author: U.alex, createdAt: daysAgo(12), likeCount: 203, commentCount: 41, image: us("photo-1511379938547-c1f69419868d", 1600, 900) },
  { id: "p21", communityId: "c6", title: "Plein air kit under 5kg", excerpt: "Everything fits in one backpack.", author: U.emma, createdAt: daysAgo(8), likeCount: 41, commentCount: 8, image: us("photo-1506905925346-21bda4d32df4", 1600, 900) },
  { id: "p22", communityId: "c14", title: "Candid vs staged — ethics thread", excerpt: "Where do you draw the line?", author: U.chris, createdAt: hoursAgo(30), likeCount: 92, commentCount: 35, image: us("photo-1502920917128-1aa500764cbd", 1600, 900) },
  { id: "p23", communityId: "c11", title: "Proxy workflow in Resolve", excerpt: "M1 Max — settings screenshot.", author: U.zara, createdAt: daysAgo(15), likeCount: 67, commentCount: 12, image: us("photo-1536440136628-849c177e76a1", 1600, 900) },
  { id: "p24", communityId: "c4", title: "Heel turns on sticky floors — hacks?", excerpt: "Community hall nightmare.", author: U.lauren, createdAt: minsAgo(90), likeCount: 14, commentCount: 5, image: us("photo-1508700929628-666bc8bd84ea", 1600, 900) },
  { id: "p25", communityId: "c7", title: "Breath count for anxiety spikes", excerpt: "4-7-8 vs box — your experience?", author: U.peter, createdAt: daysAgo(20), likeCount: 178, commentCount: 44, image: us("photo-1506126613408-eca07ce68773", 1600, 900) },
  { id: "p26", communityId: "c8", title: "Brush pack for Procreate — favourites", excerpt: "No affiliate links, just love.", author: U.maya, createdAt: daysAgo(4), likeCount: 99, commentCount: 17, image: us("photo-1513364776144-60967b0f800f", 1600, 900) },
  { id: "p27", communityId: "c5", title: "Legal walls in your city — map thread", excerpt: "Drop pins + rules of thumb.", author: U.james, createdAt: daysAgo(9), likeCount: 22, commentCount: 6, image: us("photo-1561214115-f2f134cc4912", 1600, 900) },
  { id: "p28", communityId: "c12", title: "Week 4 wash — too muddy?", excerpt: "Instructor feedback appreciated.", author: U.sofia, createdAt: daysAgo(3), likeCount: 31, commentCount: 9, image: us("photo-1579783902614-a3fb3927b6a5", 1600, 900) },
  { id: "p29", communityId: "c17", title: "Location sound on a phone — acceptable?", excerpt: "Indie budget realities.", author: U.oliver, createdAt: hoursAgo(5), likeCount: 54, commentCount: 14, image: us("photo-1574717024653-61fd2cf4d44d", 1600, 900) },
  { id: "p30", communityId: "c16", title: "Fingerstyle arrangement — Beatles cover", excerpt: "Tabs in comments.", author: U.nina, createdAt: daysAgo(1), likeCount: 145, commentCount: 28, image: us("photo-1510915361894-db8b60106cb1", 1600, 900) },
  { id: "p31", communityId: "c9", title: "Bullet journal for course deadlines", excerpt: "Minimal spreads only.", author: U.alex, createdAt: daysAgo(11), likeCount: 63, commentCount: 11, image: us("photo-1517841905240-472988babdf9", 1600, 900) },
  { id: "p32", communityId: "c18", title: "Character voice — same sentence test", excerpt: "Three versions inside.", author: U.emma, createdAt: hoursAgo(18), likeCount: 29, commentCount: 8, image: us("photo-1481627834876-b7833e8f5570", 1600, 900) },
  { id: "p33", communityId: "c3", title: "RAW vs JPEG for learning exposure", excerpt: "Hot take inside.", author: U.chris, createdAt: daysAgo(6), likeCount: 88, commentCount: 26, image: us("photo-1502920917128-1aa500764cbd", 1600, 900) },
  { id: "p34", communityId: "c1", title: "Yarn stash organisation — pegboard?", excerpt: "Before/after photos.", author: U.zara, createdAt: minsAgo(200), likeCount: 76, commentCount: 13, image: us("photo-1606107557195-0e29a4b5b4aa", 1600, 900) },
  { id: "p35", communityId: "c15", title: "Warm-up playlist — share yours", excerpt: "Spotify links ok.", author: U.dave, createdAt: daysAgo(14), likeCount: 41, commentCount: 9, image: us("photo-1515886657613-9f3515b0c78f", 1600, 900) },
  { id: "p36", communityId: "c13", title: "Glaze cracking — bisque too thin?", excerpt: "Photos attached.", author: U.lauren, createdAt: hoursAgo(40), likeCount: 19, commentCount: 7, image: us("photo-1565193566173-7a0ee3dbe261", 1600, 900) },
  { id: "p37", communityId: "c10", title: "Reference tracks for mastering loudness", excerpt: "Streaming targets 2025.", author: U.peter, createdAt: daysAgo(18), likeCount: 117, commentCount: 19, image: us("photo-1511379938547-c1f69419868d", 1600, 900) },
  { id: "p38", communityId: "c6", title: "Studio visit — local museum copy day", excerpt: "What I learned from Velázquez.", author: U.maya, createdAt: daysAgo(25), likeCount: 52, commentCount: 10, image: us("photo-1579783902614-a3fb3927b6a5", 1600, 900) },
  { id: "p39", communityId: "c2", title: "Histogram vs zebra — which do you trust?", excerpt: "Mirrorless EVF question.", author: U.james, createdAt: hoursAgo(72), likeCount: 71, commentCount: 15, image: us("photo-1516035069371-29a1b244cc32", 1600, 900) },
  { id: "p40", communityId: "c11", title: "Colour grade — too orange?", excerpt: "Client wants “warm” not “orange”.", author: U.sofia, createdAt: daysAgo(5), likeCount: 38, commentCount: 11, image: us("photo-1574717024653-61fd2cf4d44d", 1600, 900) },
  { id: "p41", communityId: "c7", title: "Meditation apps vs silent timer", excerpt: "Curious what stuck for you.", author: U.oliver, createdAt: minsAgo(320), likeCount: 84, commentCount: 18, image: us("photo-1544367567-0f2fcb009e0b", 1600, 900) },
  { id: "p42", communityId: "c4", title: "Saturday social — what are you wearing?", excerpt: "Theme is metallic.", author: U.nina, createdAt: daysAgo(2), likeCount: 25, commentCount: 6, image: us("photo-1493225457124-a3eb161ffa5f", 1600, 900) },
  { id: "p43", communityId: "c14", title: "35mm vs 50mm for street", excerpt: "One lens holiday challenge.", author: U.alex, createdAt: daysAgo(30), likeCount: 196, commentCount: 52, image: us("photo-1502920917128-1aa500764cbd", 1600, 900) },
  { id: "p44", communityId: "c8", title: "Gesture drawing 20 min session", excerpt: "Timelapse link.", author: U.emma, createdAt: hoursAgo(10), likeCount: 61, commentCount: 12, image: us("photo-1513364776144-60967b0f800f", 1600, 900) },
  { id: "p45", communityId: "c5", title: "Mask + respirator fit check", excerpt: "Safety first thread.", author: U.chris, createdAt: daysAgo(7), likeCount: 47, commentCount: 8, image: us("photo-1561214115-f2f134cc4912", 1600, 900) },
  { id: "p46", communityId: "c17", title: "Crowdfunding BTS — what we’d redo", excerpt: "Honest post-mortem.", author: U.zara, createdAt: daysAgo(22), likeCount: 133, commentCount: 29, image: us("photo-1574717024653-61fd2cf4d44d", 1600, 900) },
  { id: "p47", communityId: "c9", title: "Meal prep for long studio days", excerpt: "Vegetarian ideas.", author: U.dave, createdAt: hoursAgo(15), likeCount: 55, commentCount: 14, image: us("photo-1547592180-85f173990554", 1600, 900) },
  { id: "p48", communityId: "c16", title: "Capo placement for singing in D", excerpt: "Vocal range thread.", author: U.lauren, createdAt: daysAgo(13), likeCount: 39, commentCount: 7, image: us("photo-1510915361894-db8b60106cb1", 1600, 900) },
  { id: "p49", communityId: "c12", title: "Paper buckling — stretch or tape first?", excerpt: "Cold press woes.", author: U.peter, createdAt: daysAgo(4), likeCount: 28, commentCount: 6, image: us("photo-1579783902614-a3fb3927b6a5", 1600, 900) },
  { id: "p50", communityId: "c18", title: "Critique swap — who’s in this weekend?", excerpt: "Max 1500 words.", author: U.maya, createdAt: minsAgo(45), likeCount: 17, commentCount: 5, image: us("photo-1481627834876-b7833e8f5570", 1600, 900) },
];

function communityById(id: string): Community {
  const c = communities.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown community ${id}`);
  return c;
}

export const posts: ForumPost[] = postSeeds.map((s) => {
  const c = communityById(s.communityId);
  return {
    id: s.id,
    communityId: c.id,
    communitySlug: c.slug,
    communityHandle: c.handle,
    title: s.title,
    excerpt: s.excerpt,
    body: sampleBody,
    author: s.author,
    createdAt: s.createdAt,
    likeCount: s.likeCount,
    commentCount: s.commentCount,
    imageUrl: s.image,
  };
});

/** Newest first — use for feeds */
export const postsNewestFirst: ForumPost[] = [...posts].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

function mkComment(
  id: string,
  postId: string,
  parentId: string | null,
  author: ForumUser,
  body: string,
  days: number,
  likes: number,
): ForumComment {
  return {
    id,
    postId,
    parentId,
    author,
    body,
    createdAt: daysAgo(days),
    likeCount: likes,
  };
}

export const commentsByPost: Record<string, ForumComment[]> = {
  p1: [
    mkComment("cm1", "p1", null, U.peter, "This is incredibly helpful — thanks for the breakdown!", 10, 12),
    mkComment("cm2", "p1", "cm1", U.dave, "Glad it helped! Let me know if you want a gear list.", 9, 4),
    mkComment("cm3", "p1", null, U.lauren, "Saving this for my studio rebuild next month.", 2, 8),
    mkComment("cm4", "p1", "cm1", U.maya, "Same question on softboxes — brand?", 8, 3),
    mkComment("cm5", "p1", null, U.james, "Could you share EXIF for the hero shot?", 5, 6),
  ],
  p3: [
    mkComment("cm-p3-1", "p3", null, U.dave, "35mm 1.4 if you can swing it — worth it in grey weather.", 0, 5),
    mkComment("cm-p3-2", "p3", "cm-p3-1", U.maya, "Appreciate it — looking at Sigma.", 0, 2),
  ],
  p4: [
    mkComment("cm-p4-1", "p4", null, U.sofia, "Kick is punchy — maybe high shelf the hats?", 0, 14),
    mkComment("cm-p4-2", "p4", null, U.oliver, "Love the stereo width on the pads.", 0, 7),
  ],
  p5: [
    mkComment("cm-p5-1", "p5", null, U.nina, "Started the same routine — day 4 energy is real.", 1, 22),
    mkComment("cm-p5-2", "p5", "cm-p5-1", U.sofia, "Stick with it — week 2 is the wall.", 1, 9),
  ],
  p10: [
    mkComment("cm-p10-1", "p10", null, U.alex, "Try pink dot soft cap for fills.", 3, 2),
  ],
  p20: [
    mkComment("cm-p20-1", "p20", null, U.emma, "Sidechain to kick only — not the whole bus.", 4, 31),
    mkComment("cm-p20-2", "p20", "cm-p20-1", U.alex, "This fixed my pumping issue overnight.", 4, 8),
  ],
  p22: [
    mkComment("cm-p22-1", "p22", null, U.chris, "Ask first, always — especially kids in frame.", 1, 18),
    mkComment("cm-p22-2", "p22", null, U.zara, "Street fair different rules than subway — imho.", 1, 11),
  ],
  p25: [
    mkComment("cm-p25-1", "p25", null, U.lauren, "Box breathing changed my sleep.", 5, 27),
  ],
  p43: [
    mkComment("cm-p43-1", "p43", null, U.peter, "50mm for me — closer engagement.", 6, 24),
    mkComment("cm-p43-2", "p43", "cm-p43-1", U.maya, "35mm if you like context layers.", 6, 19),
  ],
};

/** Re-export for modules that still import from seed; prefer `EXPLORE_CATEGORIES` from `@/domain/forum`. */
export const exploreCategories = EXPLORE_CATEGORIES;

export const recommendedCourses: RecommendedCourse[] = [
  {
    id: "course1",
    title: "Guitar for Beginners",
    instructor: "Dave Devonshire",
    instructorAvatar: us("photo-1472099645785-5658abf4ff4e", 64),
    level: "Beginner",
    duration: "5h",
    price: "£29.99",
    imageUrl: us("photo-1510915361894-db8b60106cb1", 400, 240),
  },
  {
    id: "course2",
    title: "Watercolour Foundations",
    instructor: "Sofia Alvarez",
    instructorAvatar: us("photo-1544005313-94ddf0286df2", 64),
    level: "Beginner",
    duration: "4h",
    price: "£24.99",
    imageUrl: us("photo-1579783902614-a3fb3927b6a5", 400, 240),
  },
  {
    id: "course3",
    title: "Street Photography Walks",
    instructor: "Maya Chen",
    instructorAvatar: us("photo-1438761681033-6461ffad8d80", 64),
    level: "Intermediate",
    duration: "3h",
    price: "£34.99",
    imageUrl: us("photo-1502920917128-1aa500764cbd", 400, 240),
  },
  {
    id: "course4",
    title: "Ableton Live Essentials",
    instructor: "James Okonkwo",
    instructorAvatar: us("photo-1492562080023-ab3db95bfbce", 64),
    level: "Beginner",
    duration: "6h",
    price: "£39.99",
    imageUrl: us("photo-1511379938547-c1f69419868d", 400, 240),
  },
  {
    id: "course5",
    title: "Pottery on the Wheel",
    instructor: "Emma Wilson",
    instructorAvatar: us("photo-1487412720507-e7ab37603c6f", 64),
    level: "Beginner",
    duration: "8h",
    price: "£49.99",
    imageUrl: us("photo-1565193566173-7a0ee3dbe261", 400, 240),
  },
  {
    id: "course6",
    title: "Short Film Production",
    instructor: "Oliver Grant",
    instructorAvatar: us("photo-1500648767791-00dcc994a43e", 64),
    level: "Intermediate",
    duration: "12h",
    price: "£59.99",
    imageUrl: us("photo-1574717024653-61fd2cf4d44d", 400, 240),
  },
];

export function getCommunityBySlug(slug: string) {
  return communities.find((c) => c.slug === slug);
}

export function getPostById(id: string) {
  return posts.find((p) => p.id === id);
}

export function getCommentsForPost(postId: string) {
  return commentsByPost[postId] ?? [];
}
