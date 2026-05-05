/**
 * Forum seed bundle — Lexical bodies, Unsplash URLs, and comment graphs.
 * Consumed only by {@link MockForumRepository}; app code uses `getForumRepository()`.
 */
import type { SerializedEditorState } from "lexical";
import { EXPLORE_CATEGORIES } from "@/domain/forum/explore-categories";
import { lexicalFromParagraphs } from "@/lib/forum/lexical-from-plain";
import { buildUnsplashUrl } from "@/lib/media/unsplash-url";
import type {
  Community,
  ForumComment,
  ForumPost,
  ForumUser,
  RecommendedCourse,
} from "@/types/forum";

const us = buildUnsplashUrl;

/** Demo “logged-in” learner — {@link myPosts} are attributed to this user. */
export const DEMO_MY_POST_AUTHOR_ID = "u-megan";

export const sampleBody: SerializedEditorState = lexicalFromParagraphs([
  "Welcome to the course discussion. Replace this placeholder once posts are loaded from Payload.",
]);

const U: Record<string, ForumUser> = {
  megan: {
    id: DEMO_MY_POST_AUTHOR_ID,
    name: "Megan Thornton",
    avatarUrl: us("photo-1494790108377-be9c29b29330", 128),
  },
  david: {
    id: "u-david",
    name: "David Mensah",
    avatarUrl: us("photo-1570295999919-56ceb5ecca61", 128),
  },
  mark: {
    id: "u-mark",
    name: "Mark Bowers (Instructor)",
    avatarUrl: us("photo-1560250097-0b93528c311a", 128),
  },
  rosie: {
    id: "u-rosie",
    name: "Rosie Aitken",
    avatarUrl: us("photo-1580489944761-15a19d654956", 128),
  },
  yuki: {
    id: "u-yuki",
    name: "Yuki Tanaka",
    avatarUrl: us("photo-1438761681033-6461ffad8d80", 128),
  },
  priyaK: {
    id: "u-priya-k",
    name: "Priya K.",
    avatarUrl: us("photo-1531746020798-e6953c6e8e04", 128),
  },
  sarah: {
    id: "u-sarah",
    name: "Sarah Chen (Instructor)",
    avatarUrl: us("photo-1573496359142-b8d87734a5a2", 128),
  },
  jamesO: {
    id: "u-james-o",
    name: "James O.",
    avatarUrl: us("photo-1500648767791-00dcc994a43e", 128),
  },
  sophieL: {
    id: "u-sophie-l",
    name: "Sophie L.",
    avatarUrl: us("photo-1544723795-3fb6469f5b39", 128),
  },
  marcusW: {
    id: "u-marcus-w",
    name: "Marcus W.",
    avatarUrl: us("photo-1517841905240-472988babdf9", 128),
  },
  elenaR: {
    id: "u-elena-r",
    name: "Elena R.",
    avatarUrl: us("photo-1487412720507-e7ab37603c6f", 128),
  },
  danielR: {
    id: "u-daniel-r",
    name: "Daniel R.",
    avatarUrl: us("photo-1504257432389-52343af06ae3", 128),
  },
  aishaN: {
    id: "u-aisha-n",
    name: "Aisha N.",
    avatarUrl: us("photo-1531123897727-8f129e1688ce", 128),
  },
  tomF: {
    id: "u-tom-f",
    name: "Tom F.",
    avatarUrl: us("photo-1519345182560-3f2917c472ef", 128),
  },
  hannahP: {
    id: "u-hannah-p",
    name: "Hannah P.",
    avatarUrl: us("photo-1524504388940-b1c1722653e1", 128),
  },
  joanneT: {
    id: "u-joanne-t",
    name: "Joanne T.",
    avatarUrl: us("photo-1566492031773-4f4e44671857", 128),
  },
  luciaM: {
    id: "u-lucia-m",
    name: "Lucia M.",
    avatarUrl: us("photo-1488426862026-3ee34a7d66df", 128),
  },
  bethW: {
    id: "u-beth-w",
    name: "Beth W.",
    avatarUrl: us("photo-1551836022-d5d88e9218df", 128),
  },
  liamB: {
    id: "u-liam-b",
    name: "Liam B.",
    avatarUrl: us("photo-1522556189639-b150ed9c4330", 128),
  },
  anna: {
    id: "u-anna",
    name: "Anna Rao (Instructor)",
    avatarUrl: us("photo-1594744803329-e58b31de8bf5", 128),
  },
  priyaM: {
    id: "u-priya-m",
    name: "Priya M.",
    avatarUrl: us("photo-1607746882042-944635dfe10e", 128),
  },
};

export const communities: Community[] = [
  {
    id: "c1",
    slug: "watercolour-sarah-chen",
    displayName: "Watercolour with Sarah Chen",
    handle: "oas/watercolour-sarah-chen",
    description:
      "Peer feedback, wash technique questions, and homework from Sarah's watercolour course — enrolled learners only.",
    memberCount: 284,
    studentsOnly: true,
    /* Watercolour washes / palette — reads clearly as painting, not generic decor */
    imageUrl: us("photo-1513364776144-60967b0f800f", 400),
    category: "Art",
  },
  {
    id: "c2",
    slug: "light-lens-course",
    displayName: "The Light & Lens Course",
    handle: "oas/light-lens-course",
    description:
      "Assignments, manual mode breakdowns, and kit questions from the Light & Lens photography cohort.",
    memberCount: 612,
    studentsOnly: true,
    /* DSLR / photography — stable id for course community icon */
    imageUrl: us("photo-1516035069371-29a1b244cc32", 400),
    category: "Photography",
  },
  {
    id: "c3",
    slug: "marks-music-lab",
    displayName: "Mark's Music Lab",
    handle: "oas/marks-music-lab",
    description:
      "Mix critiques, DAW questions, and bonus lesson discussion for Mark's music production students.",
    memberCount: 1043,
    studentsOnly: true,
    /* DJ booth / decks — electronic & club production vibe */
    imageUrl: us("photo-1614613535308-eb5fbd3d2c17", 400),
    category: "Music",
  },
  {
    id: "c4",
    slug: "slow-stitch-club",
    displayName: "Slow Stitch Club",
    handle: "oas/slow-stitch-club",
    description:
      "Hoops, thread choices, and stitch help for the Slow Stitch Club course community.",
    memberCount: 156,
    studentsOnly: true,
    /* Embroidery hoop / slow stitch — matches p4 thread hero */
    imageUrl: "/forum/post-p4-slow-stitch-hoop.png",
    category: "Craft",
  },
  {
    id: "c5",
    slug: "procreate-anna-rao",
    displayName: "Procreate with Anna Rao",
    handle: "oas/procreate-anna-rao",
    description:
      "Character prompts, brush settings, and WIP feedback for Anna's Procreate learners.",
    memberCount: 892,
    studentsOnly: true,
    /* Procreate-style portrait — supplied asset for course community */
    imageUrl: "/forum/community-procreate-anna-rao.png",
    category: "Illustration",
  },
  {
    id: "c6",
    slug: "slow-stitch-crochet-club",
    displayName: "Slow Stitch Crochet Club",
    handle: "oas/slow-stitch-crochet-club",
    description:
      "Craft — Crochet · A friendly space for beginner crocheters; pattern help, yarn recommendations and work-in-progress shares.",
    memberCount: 428,
    imageUrl: us("photo-1606107557195-0e29a4b5b4aa", 400),
    category: "Craft",
  },
  {
    id: "c7",
    slug: "photography-tom-hartley",
    displayName: "Photography with Tom Hartley",
    handle: "oas/photography-tom-hartley",
    description:
      "Photography · Tom's classroom community for assignments, kit questions and peer feedback.",
    memberCount: 715,
    imageUrl: us("photo-1520390138845-fd2d229dd553", 400),
    category: "Photography",
  },
  {
    id: "c8",
    slug: "sketchbook-club-isobel-ford",
    displayName: "Sketchbook Club with Isobel Ford",
    handle: "oas/sketchbook-club-isobel-ford",
    description:
      "Art — Drawing · Where Isobel's students share their daily sketches and weekly drawing prompts.",
    memberCount: 367,
    imageUrl: us("photo-1513364776144-60967b0f800f", 400),
    category: "Art",
  },
  {
    id: "c9",
    slug: "piano-room-jonas-berg",
    displayName: "The Piano Room with Jonas Berg",
    handle: "oas/piano-room-jonas-berg",
    description:
      "Music & Audio — Piano · A practice-and-progress space for pianists working through Jonas's repertoire.",
    memberCount: 521,
    imageUrl: us("photo-1520523839897-bd0b52f945a0", 400),
    category: "Music",
  },
  {
    id: "c10",
    slug: "soap-studio-clara-bennett",
    displayName: "Soap Studio with Clara Bennett",
    handle: "oas/soap-studio-clara-bennett",
    description:
      "Craft — Soap making · Recipes, fragrance pairings and small-batch making with Clara's students.",
    memberCount: 198,
    imageUrl: us("photo-1602607202436-d1b8db3b7b32", 400),
    category: "Craft",
  },
  {
    id: "c11",
    slug: "ink-brush-hiro-tanaka",
    displayName: "Ink & Brush with Hiro Tanaka",
    handle: "oas/ink-brush-hiro-tanaka",
    description:
      "Illustration — Traditional · Traditional illustration techniques and weekly art prompts from Hiro.",
    memberCount: 444,
    imageUrl: us("photo-1549185984-cb519424aa49", 400),
    category: "Illustration",
  },
  {
    id: "c12",
    slug: "edit-suite-rafael-costa",
    displayName: "The Edit Suite with Rafael Costa",
    handle: "oas/edit-suite-rafael-costa",
    description:
      "Video — Video Editing · Colour grading, pacing and project feedback for Rafael's editing students.",
    memberCount: 633,
    imageUrl: us("photo-1554875064-0a8f7d6a2307", 400),
    category: "Videography",
  },
  {
    id: "c13",
    slug: "knit-club-margaret-hayes",
    displayName: "Knit Club with Margaret Hayes",
    handle: "oas/knit-club-margaret-hayes",
    description:
      "Craft — Knitting · A relaxed space for knitters. Share your finished pieces and ask for help when patterns get tricky.",
    memberCount: 312,
    imageUrl: us("photo-1617576683096-00fc8eecb3af", 400),
    category: "Craft",
  },
  {
    id: "c14",
    slug: "dj-lab-andre-williams",
    displayName: "DJ Lab with Andre Williams",
    handle: "oas/dj-lab-andre-williams",
    description:
      "Music & Audio — DJ and Mixing · Beatmatching, transitions and set sharing with fellow DJs learning the craft.",
    memberCount: 889,
    imageUrl: us("photo-1572327918400-f1932eded229", 400),
    category: "Music",
  },
];

function daysAgo(d: number): string {
  return new Date(Date.now() - 1000 * 60 * 60 * 24 * d).toISOString();
}

function hoursAgo(h: number): string {
  return new Date(Date.now() - 1000 * 60 * 60 * h).toISOString();
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
  body: SerializedEditorState;
  includeInMainFeed?: boolean;
};

function communityById(id: string): Community {
  const c = communities.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown community ${id}`);
  return c;
}

const POST_P2_CAPTION =
  "I've been on auto for years and switching everything to manual feels like learning to drive again. I keep getting the exposure wrong, especially in changing light. How long did it take you all to get comfortable with it? Wondering if I should slow down and redo Module 2 before pushing on, or if it just clicks eventually with more practice.";

const POST_P2_EXCERPT =
  "I've been on auto for years and switching everything to manual feels like learning to drive again. I keep getting the exposure wrong, especially in changing light. How long did it take ...";

const POST_P4_P1 =
  "When I started this course I genuinely couldn't tell a satin stitch from a chain stitch. Today I framed my first hoop that I'm actually proud of. Going to give it to my mum for her birthday next week.";
const POST_P4_P2 =
  "Thank you to everyone in this club who's answered my (many, many) panicked questions along the way. This community is the reason I stuck with it ❤️";

const POST_P4_EXCERPT =
  "When I started this course I genuinely couldn't tell a satin stitch from a chain stitch. Today I framed my first hoop ...";

const POST_P5_CAPTION =
  "Working on the character portrait brief from Module 4. I've got the line work and flat colours down but I'm at the part where I always overthink the shading and end up muddying the whole thing. Anna's lesson on soft vs hard shading was so helpful but I can't decide which would suit this piece better. Going for a slightly soft, painterly feel but I don't want to lose the line work. Any thoughts?";

const POST_P5_EXCERPT =
  "Working on the character portrait brief from Module 4. I've got the line work and flat colours down but I'm at the part where ...";

const postSeeds: PostSeed[] = [
  {
    id: "p1",
    communityId: "c1",
    title: "Finally finished my first proper landscape!",
    excerpt:
      "Been working on this one all week, it's the misty hills exercise from Module 3. I'm pretty happy with how ...",
    author: U.megan,
    createdAt: daysAgo(2),
    likeCount: 47,
    commentCount: 4,
    image: "/forum/post-p1-watercolour-landscape.png",
    includeInMainFeed: true,
    body: lexicalFromParagraphs([
      "Been working on this one all week, it's the misty hills exercise from Module 3. I'm pretty happy with how the background washes turned out but I'm not sure about the foreground trees; they feel a bit heavy compared to the rest of the painting?",
      "Would love any feedback before I move on to the next exercise. Sarah, if you spot this — was I meant to wait longer between the layers? I think I might have rushed the second wash.",
    ]),
  },
  {
    id: "p2",
    communityId: "c2",
    title: "Does anyone else find the manual mode exercises overwhelming?",
    excerpt: POST_P2_EXCERPT,
    author: U.david,
    createdAt: hoursAgo(30),
    likeCount: 62,
    commentCount: 4,
    includeInMainFeed: true,
    body: lexicalFromParagraphs([POST_P2_CAPTION]),
  },
  {
    id: "p3",
    communityId: "c3",
    title: "Course update: 3 new lessons added to the Mixing module",
    excerpt:
      "Low-end clarity, vocals sitting in the mix, and a full stock-plugin walkthrough — now live.",
    author: U.mark,
    createdAt: hoursAgo(8),
    likeCount: 128,
    commentCount: 5,
    includeInMainFeed: true,
    body: lexicalFromParagraphs([
      "Hey everyone! Based on the questions coming up in the forum (a lot of you have been asking about low-end clarity and vocals sitting in the mix), I've recorded three new bonus lessons that are now live in Module 6:",
      "• Taming muddy low-mids with subtractive EQ",
      "• Getting vocals to sit forward without harshness",
      "• A full mix walkthrough using only stock plugins",
      "These are free for everyone enrolled. Would love to hear what you think once you've worked through them — the stock plugins one in particular was fun to put together because I know not everyone wants to drop money on third-party tools straight away. Happy mixing!",
    ]),
  },
  {
    id: "p4",
    communityId: "c4",
    title: "6 months in and I finished my first proper piece!",
    excerpt: POST_P4_EXCERPT,
    author: U.rosie,
    createdAt: daysAgo(1),
    likeCount: 203,
    commentCount: 5,
    image: "/forum/post-p4-slow-stitch-hoop.png",
    includeInMainFeed: true,
    body: lexicalFromParagraphs([POST_P4_P1, POST_P4_P2]),
  },
  {
    id: "p5",
    communityId: "c5",
    title: "Work in progress, would love thoughts before I commit to the shading...",
    excerpt: POST_P5_EXCERPT,
    author: U.yuki,
    createdAt: hoursAgo(5),
    likeCount: 71,
    commentCount: 4,
    image: "/forum/post-p5-yuki-procreate-wip.png",
    includeInMainFeed: true,
    body: lexicalFromParagraphs([POST_P5_CAPTION]),
  },
  {
    id: "mp1",
    communityId: "c1",
    title: "Finally feeling like I'm getting it!",
    excerpt:
      "Couldn't get a clean wash when I started — sharing for anyone who needs the encouragement.",
    author: U.megan,
    createdAt: daysAgo(12),
    likeCount: 36,
    commentCount: 3,
    image: "/forum/post-mp1-lavender.png",
    includeInMainFeed: false,
    body: lexicalFromParagraphs([
      "Couldn't get a clean wash to save my life when I started this course. Sharing in case anyone earlier in the course needs the encouragement — it does click eventually!",
    ]),
  },
  {
    id: "mp2",
    communityId: "c3",
    title: "Beginner question — how do you actually hear compression?",
    excerpt:
      "I get what it does in theory but I can't tell the difference on my own tracks yet.",
    author: U.megan,
    createdAt: daysAgo(4),
    likeCount: 22,
    commentCount: 3,
    includeInMainFeed: false,
    body: lexicalFromParagraphs([
      "I get what it does in theory but when I use it on my own tracks I can't tell the difference. Any tips for training my ears?",
    ]),
  },
  {
    id: "mp3",
    communityId: "c5",
    title: "First piece I'm actually proud of",
    excerpt:
      "Started in January with zero digital art experience — three months later, this.",
    author: U.megan,
    createdAt: daysAgo(6),
    likeCount: 94,
    commentCount: 3,
    image: "/forum/post-mp3-proud-portrait.png",
    includeInMainFeed: false,
    body: lexicalFromParagraphs([
      "Started this course in January with zero digital art experience. Three months later, I've created this. Thank you, Anna, for breaking it all down so patiently!",
    ]),
  },
];

function mapSeedToPost(s: PostSeed): ForumPost {
  const c = communityById(s.communityId);
  return {
    id: s.id,
    communityId: c.id,
    communitySlug: c.slug,
    communityHandle: c.handle,
    communityDisplayName: c.displayName,
    title: s.title,
    excerpt: s.excerpt,
    body: s.body,
    author: s.author,
    createdAt: s.createdAt,
    likeCount: s.likeCount,
    commentCount: s.commentCount,
    imageUrl: s.image,
    includeInMainFeed: s.includeInMainFeed,
  };
}

export const posts: ForumPost[] = postSeeds.map(mapSeedToPost);

export const myPosts: ForumPost[] = posts.filter(
  (p) => p.author.id === DEMO_MY_POST_AUTHOR_ID,
);

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
    mkComment(
      "cm-p1-1",
      "p1",
      null,
      U.priyaK,
      "Megan this is gorgeous! The misty effect in the background is exactly what I've been trying to achieve. The trees look fine to me but maybe just a tiny bit more water in the brush next time?",
      2,
      14,
    ),
    mkComment(
      "cm-p1-2",
      "p1",
      null,
      U.sarah,
      "Beautiful work, Megan! You're spot on about the second wash — give it another minute or two next time and the colours will sit more softly. The composition is lovely though; don't be too hard on yourself.",
      2,
      28,
    ),
    mkComment(
      "cm-p1-3",
      "p1",
      "cm-p1-1",
      U.megan,
      "Thank you both! Sarah that makes total sense — I was getting impatient. Will try again this weekend.",
      1,
      6,
    ),
    mkComment(
      "cm-p1-4",
      "p1",
      null,
      U.jamesO,
      "Saving this for inspiration!",
      2,
      5,
    ),
  ],
  p2: [
    mkComment(
      "cm-p2-1",
      "p2",
      null,
      U.sophieL,
      "Honestly took me about 3 weeks of daily shooting before it stopped feeling like maths. Stick with it!",
      1,
      11,
    ),
    mkComment(
      "cm-p2-2",
      "p2",
      null,
      U.marcusW,
      "I'd say redo Module 2, that exposure triangle diagram is everything, once it clicks it clicks. I still go back to it.",
      1,
      9,
    ),
    mkComment(
      "cm-p2-3",
      "p2",
      null,
      U.david,
      "Thanks both, that's reassuring. I think I'll redo it this weekend and just shoot in my garden until it feels natural.",
      0,
      4,
    ),
    mkComment(
      "cm-p2-4",
      "p2",
      null,
      U.elenaR,
      "Same boat as you David, you're not alone! Module 2 second time round is so much clearer.",
      0,
      7,
    ),
  ],
  p3: [
    mkComment(
      "cm-p3-1",
      "p3",
      null,
      U.danielR,
      "This is unreal — I've been hanging out for exactly this kind of stock plugins walkthrough. Going in tonight!",
      0,
      16,
    ),
    mkComment(
      "cm-p3-2",
      "p3",
      null,
      U.aishaN,
      "The vocal lesson — I've been wrestling with vocals for weeks. Thank you for this 🙏",
      0,
      12,
    ),
    mkComment(
      "cm-p3-3",
      "p3",
      null,
      U.tomF,
      "Love how this course keeps levelling up. Appreciate you Mark!",
      0,
      20,
    ),
    mkComment(
      "cm-p3-4",
      "p3",
      null,
      U.sophieL,
      "Do I need to finish Module 5 before these land, or can I jump straight in?",
      0,
      5,
    ),
    mkComment(
      "cm-p3-5",
      "p3",
      "cm-p3-4",
      U.mark,
      "@Sophie they build on Module 5 a little but you should be fine to jump in if you've covered the basics of EQ and compression. If anything's unclear just shout 👍",
      0,
      8,
    ),
  ],
  p4: [
    mkComment(
      "cm-p4-1",
      "p4",
      null,
      U.hannahP,
      "Rosie this is STUNNING. Your mum is going to cry 🥹",
      1,
      24,
    ),
    mkComment(
      "cm-p4-2",
      "p4",
      null,
      U.joanneT,
      "The colour palette is so beautiful, what threads did you use?",
      1,
      6,
    ),
    mkComment(
      "cm-p4-3",
      "p4",
      "cm-p4-2",
      U.rosie,
      "@Joanne mostly DMC, happy to share the list if you want?",
      0,
      4,
    ),
    mkComment(
      "cm-p4-4",
      "p4",
      null,
      U.luciaM,
      "This is exactly the kind of post I needed to see today, I've been ready to give up on mine. Saving for motivation.",
      1,
      15,
    ),
    mkComment(
      "cm-p4-5",
      "p4",
      "cm-p4-4",
      U.bethW,
      "From someone who's been there, keep going Lucia, the breakthrough comes ✨",
      0,
      9,
    ),
  ],
  p5: [
    mkComment(
      "cm-p5-1",
      "p5",
      null,
      U.liamB,
      "I think soft would suit this beautifully, the line work is delicate so hard shading might fight it?",
      0,
      10,
    ),
    mkComment(
      "cm-p5-2",
      "p5",
      null,
      U.anna,
      "Agreed with Liam. Try soft on a clipping mask at low opacity first, you can always build up. Lovely linework btw, your confidence has come on so much since the first module 💫",
      0,
      22,
    ),
    mkComment(
      "cm-p5-3",
      "p5",
      "cm-p5-2",
      U.yuki,
      "Anna 🥹 thank you, that means a lot. Trying soft now!",
      0,
      5,
    ),
    mkComment(
      "cm-p5-4",
      "p5",
      null,
      U.priyaM,
      "The character has so much personality already, can't wait to see it finished",
      0,
      7,
    ),
  ],
  mp1: [
    mkComment(
      "cm-mp1-1",
      "mp1",
      null,
      U.priyaK,
      "This is gorgeous! I'm on Week 2 and needed to read this.",
      3,
      10,
    ),
    mkComment(
      "cm-mp1-2",
      "mp1",
      null,
      U.sarah,
      "Lovely piece — your wash control has really come on. Keep going!",
      3,
      14,
    ),
    mkComment(
      "cm-mp1-3",
      "mp1",
      null,
      U.tomF,
      "The colour is so soft — lovely work.",
      3,
      5,
    ),
  ],
  mp2: [
    mkComment(
      "cm-mp2-1",
      "mp2",
      null,
      U.danielR,
      "Try toggling a vocal compressor on and off — once you hear it, you can't unhear it.",
      2,
      8,
    ),
    mkComment(
      "cm-mp2-2",
      "mp2",
      null,
      U.aishaN,
      "Use extreme settings on a drum bus first — hear it big, then dial it back.",
      2,
      6,
    ),
    mkComment(
      "cm-mp2-3",
      "mp2",
      null,
      U.mark,
      "Great question — there's a bonus video in Module 6 specifically on this, give it a watch 👍",
      1,
      9,
    ),
  ],
  mp3: [
    mkComment(
      "cm-mp3-1",
      "mp3",
      null,
      U.yuki,
      "This is so beautiful — the colour palette is everything.",
      2,
      11,
    ),
    mkComment(
      "cm-mp3-2",
      "mp3",
      null,
      U.anna,
      "Three months of consistent work and it shows.",
      2,
      17,
    ),
    mkComment(
      "cm-mp3-3",
      "mp3",
      null,
      U.priyaM,
      "What brush settings did you use for the flowers?",
      1,
      4,
    ),
  ],
};

/** Re-export; prefer `EXPLORE_CATEGORIES` from `@/domain/forum`. */
export const exploreCategories = EXPLORE_CATEGORIES;

export const recommendedCourses: RecommendedCourse[] = [
  {
    id: "course-acrylic",
    title: "Acrylic Painting Essentials: Your First Canvas",
    instructor: "Elena Marchetti",
    instructorAvatar: us("photo-1544005313-94ddf0286df2", 64),
    level: "Beginner",
    duration: "4h",
    price: "£14.99",
    imageUrl: "/forum/course-elena-acrylic-essentials.png",
  },
  {
    id: "course-iphone-video",
    title: "Cinematic iPhone Videography: Shoot Like a Pro",
    instructor: "James Okafor",
    instructorAvatar: us("photo-1507003211169-0a1dd7228f2d", 64),
    level: "Intermediate",
    duration: "8h",
    price: "£29.99",
    imageUrl: "/forum/course-james-iphone-videography.png",
  },
  {
    id: "course-guitar-fingerstyle",
    title: "Mastering Fingerstyle Guitar: Advanced Techniques",
    instructor: "Daniel Reyes",
    instructorAvatar: us("photo-1506794778202-cad84cf45f1d", 64),
    level: "Advanced",
    duration: "18h",
    price: "£54.99",
    imageUrl: "/forum/course-daniel-fingerstyle-guitar.png",
  },
  {
    id: "course-candles",
    title: "Hand-Poured Soy Candles from Scratch",
    instructor: "Priya Shah",
    instructorAvatar: us("photo-1534528741775-53994a69daeb", 64),
    level: "Beginner",
    duration: "2.5h",
    price: "£12.99",
    imageUrl: "/forum/course-priya-soy-candles.png",
  },
  {
    id: "course-calligraphy",
    title: "Modern Calligraphy & Brush Lettering",
    instructor: "Hannah Brooks",
    instructorAvatar: us("photo-1529626455594-4ff0802cfb7e", 64),
    level: "All Levels",
    duration: "6h",
    price: "£12.99",
    imageUrl: "/forum/course-hannah-calligraphy.png",
  },
  {
    id: "course-animate-2d",
    title: "2D Animation in Adobe Animate: Bring Characters to Life",
    instructor: "Tomas Vidal",
    instructorAvatar: us("photo-1472099645785-5658abf4ff4e", 64),
    level: "Intermediate",
    duration: "12h",
    price: "£39.99",
    imageUrl: us("photo-1620912189523-9a506dd6122a", 400, 240),
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
