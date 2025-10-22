# Essentia - Portal da Intuição Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from Calm, Headspace, and Insight Timer's mystical wellness aesthetics, adapted for Portuguese spiritual practices. Focus on ethereal, dreamlike qualities with modern minimalism.

## Typography
**Font Families** (via Google Fonts):
- Primary: 'Cormorant Garamond' (serif) - mystical, elegant headers
- Secondary: 'Inter' - clean, readable body text

**Type Scale**:
- Hero Title: text-5xl/text-6xl, font-light, tracking-wide
- Portal Title: text-2xl/text-3xl, font-medium
- Section Headers: text-xl, font-semibold
- Body: text-base/text-lg, font-normal, leading-relaxed
- Reflection Prompt: text-lg, font-light, italic

## Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 24
- Container padding: px-6 mobile, px-12 desktop
- Section spacing: py-16 mobile, py-24 desktop
- Card gaps: gap-6 mobile, gap-8 desktop
- Internal card padding: p-6 mobile, p-8 desktop

**Container Strategy**:
- Max-width: max-w-6xl for content sections
- Full-width gradient backgrounds with inner containers
- Portal grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Core Design Elements

### Hero Section
**Layout**: Minimal centered introduction (60vh mobile, 70vh desktop)
- Gradient background: radial purple-to-blue fade
- Centered content: Journey title, subtitle, soft glow effect around text
- No CTA needed - scrolling reveals portals naturally

### Portal Cards Grid
**Card Structure** (repeating for multiple portals):
- White background (bg-white/90 for subtle transparency)
- Border: 3px solid with glow effect
- Border colors by portal type: Intuition (purple-500), Clarity (blue-400), Energy (teal-400)
- Soft shadow: shadow-lg with colored glow matching border
- Rounded corners: rounded-2xl
- Hover state: subtle lift (transform scale 1.02) with enhanced glow

**Card Content**:
- Portal icon/symbol at top (60px, centered)
- Portal name (text-2xl, mb-4)
- Brief description (text-base, text-gray-600, mb-6)
- "Entrar" button (full-width, gradient bg matching portal color, text-white, py-3, rounded-xl)

### Video Player Section (Portal da Intuição)
**Layout**: Appears when portal card clicked, full-width section
- Gradient background: purple-blue gradient matching intuition theme
- Video container: max-w-4xl, centered, aspect-video
- Rounded corners: rounded-3xl
- Soft shadow beneath video player
- Custom controls with purple accent color

### Post-Video Reflection Interface
**Layout**: Fade-in after video completion, centered max-w-2xl
- Ethereal gradient background (lighter purple/white blend)
- Centered mystical icon/mandala (80px, mb-8)
- Reflection prompt heading (text-2xl, text-center, mb-4, font-light)
- Prompt text (text-lg, italic, text-center, text-purple-900, mb-8)

**Textarea Design**:
- White background with subtle purple border (border-2, border-purple-300)
- Rounded: rounded-2xl
- Padding: p-6
- Min-height: h-48
- Placeholder: italic, text-gray-400
- Focus state: border-purple-500, shadow-lg with purple glow

**Save Button**:
- Below textarea (mt-6)
- Gradient background: purple to deep purple
- White text, py-4, px-12
- Rounded-full
- Centered with mx-auto

## Component Library

### Navigation
Minimal floating nav bar:
- Semi-transparent white background (bg-white/80, backdrop-blur-md)
- Logo left, minimal menu right
- Fixed position with subtle shadow

### Footer
Simplified, mystical:
- Deep purple gradient background
- Centered layout with social icons
- Minimalist copyright text (text-white/70)
- Small spiritual symbol divider

### Buttons
- Primary (Portal Entry): Gradient backgrounds, white text, py-3, px-8, rounded-xl, shadow-md
- Secondary (Navigation): Outlined, transparent bg, colored border/text, py-2, px-6, rounded-lg
- Blurred backgrounds when over gradients/images: backdrop-blur-md, bg-white/20

## Gradient Specifications
- Hero: radial-gradient from purple-600 center to blue-900 edges
- Portal Grid Background: linear-gradient purple-100 to blue-50
- Intuition Video Section: linear-gradient purple-700 to blue-600
- Reflection Section: linear-gradient purple-50 to white

## Animations
**Portal Cards**: Stagger fade-in on scroll (0.2s delay between cards), opacity 0→1, translateY 20px→0
**Video Appearance**: Fade-in with scale (scale 0.95→1, duration 0.4s)
**Reflection Interface**: Gentle fade-in (duration 0.6s) after video ends
**No other animations** - maintain calming aesthetic

## Images Section
**Hero Background Image**: 
- Ethereal, mystical scene (meditation space, spiritual symbols, soft-focus nature)
- Gradient overlay (purple-blue, 70% opacity) over image
- Placement: Full-width hero section background
- Treatment: Soft blur filter for dreamlike quality

**Portal Card Icons**: 
- SVG mystical symbols/mandalas (third eye for Intuition portal)
- Monochrome in portal's accent color
- Placed centered at card top

This page does not use a large photographic hero - instead uses gradient-based ethereal backgrounds with symbolic imagery.