import os

directory = 'c:/temporary projects/submit right/project/app/admin'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace('<div className="mx-auto w-[98%] h-px mt-2  bg-[#EAECF0]" />', '<div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />')
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

