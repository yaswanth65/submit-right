import os
import re

files_to_patch = [
    'c:/temporary projects/submit right/project/app/admin/reports/page.tsx',
    'c:/temporary projects/submit right/project/app/admin/payments/page.tsx',
    'c:/temporary projects/submit right/project/app/admin/payments/[id]/page.tsx',
    'c:/temporary projects/submit right/project/app/admin/assignments/[id]/page.tsx'
]

for path in files_to_patch:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <div className="p-6">\n<div className="... mt-4 mb-4 bg-[#EAECF0]" />\n</div>
    # and replace with mt-4 mb-0 (or remove mb-4 and p-6 pb-0... actually let's just make it pb-0)
    
    pattern = r'<div className="p-6">\s*(<div className="text-\[16px][^>]*>.*?</div>)\s*<div className="mx-auto w-\[98%\] h-px mt-4 mb-4\s*bg-\[#EAECF0\]" />\s*</div>'
    
    def replacer(match):
        heading = match.group(1)
        # remove bottom margin from the divider and make it span full if moved out, but here we just adjust parent
        return f'<div className="p-6 pb-2">\n          {heading}\n          <div className="mx-auto w-[98%] h-px mt-4 mb-0 bg-[#EAECF0]" />\n        </div>'

    new_content = re.sub(pattern, replacer, content)
    
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)

