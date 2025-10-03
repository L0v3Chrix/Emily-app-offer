#!/bin/bash

# Create backup
cp src/app/page.tsx src/app/page.tsx.backup-dark

# Replace background colors - dark to light
sed -i '' 's/from-purple-600\/20/from-bestie-coral\/20/g' src/app/page.tsx
sed -i '' 's/bg-pink-600\/20/bg-bestie-green\/20/g' src/app/page.tsx
sed -i '' 's/from-slate-800/from-white/g' src/app/page.tsx
sed -i '' 's/to-slate-900/to-bestie-gray-light/g' src/app/page.tsx
sed -i '' 's/bg-slate-900/bg-white/g' src/app/page.tsx
sed -i '' 's/bg-slate-800/bg-bestie-mint/g' src/app/page.tsx
sed -i '' 's/bg-black/bg-white/g' src/app/page.tsx

# Replace text colors - white/purple to blue/gray
sed -i '' 's/text-white/text-bestie-blue/g' src/app/page.tsx
sed -i '' 's/text-purple-200/text-bestie-gray/g' src/app/page.tsx
sed -i '' 's/text-purple-300/text-bestie-gray/g' src/app/page.tsx
sed -i '' 's/text-purple-400/text-gray-600/g' src/app/page.tsx
sed -i '' 's/text-pink-300/text-bestie-coral/g' src/app/page.tsx
sed -i '' 's/text-pink-400/text-bestie-coral/g' src/app/page.tsx

# Replace gradients
sed -i '' 's/from-pink-400 via-purple-400 to-pink-400/from-bestie-coral via-bestie-blue to-bestie-coral/g' src/app/page.tsx
sed -i '' 's/from-pink-500 to-purple-500/from-bestie-coral to-bestie-blue/g' src/app/page.tsx

# Replace borders
sed -i '' 's/border-purple-500/border-bestie-coral/g' src/app/page.tsx
sed -i '' 's/border-purple-900/border-gray-200/g' src/app/page.tsx
sed -i '' 's/border-pink-400/border-bestie-coral/g' src/app/page.tsx

echo "Rebrand complete! Check src/app/page.tsx"
echo "Backup saved to src/app/page.tsx.backup-dark"
