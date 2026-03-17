import os

for path in ['c:/temporary projects/submit right/project/app/admin/editors/page.tsx', 'c:/temporary projects/submit right/project/app/admin/students/page.tsx']:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<div className="mx-auto w-[98%] h-px mt-2  bg-[#EAECF0]" />', '<div className="mx-auto w-[98%] h-px bg-[#EAECF0]" />')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

