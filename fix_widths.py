import os

directory = 'app/admin'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            new_content = content.replace('max-w-[1140px]', 'w-full')
            
            if 'layout.tsx' in path:
                # also replace in layout.tsx
                new_content = new_content.replace('max-w-[1440px] mx-auto', '')

            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

