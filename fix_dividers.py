import os
import re

directory = 'c:/temporary projects/submit right/project/app/admin'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Case 1: Heading has mb-something, we move it to the divider.
            # Find <div className="... mb-... ">Text</div>\n<div className="... mt-2  bg-[#EAECF0]" />
            # We will remove mb-... from the heading, and make the divider have my-4
            
            def replacer(match):
                heading_start = match.group(1)
                heading_mb = match.group(2)
                heading_end = match.group(3)
                divider = match.group(4)
                
                # Replace mb-XX with nothing in the heading
                new_heading = heading_start + heading_end
                new_heading = new_heading.replace('  ', ' ') # cleanup
                
                # Make the divider have my-4 instead of mt-2
                new_divider = divider.replace('mt-2', 'mt-4 mb-4')
                
                return f"{new_heading}\n{new_divider}"

            # pattern: group 1: everything up to mb-, group 2: mb-..., group 3: rest of heading, group 4: divider
            pattern = r'(<div className="[^"]*)(mb-[^\s"]*)(\s*[^"]*">.*?</div(?:>|\s*<span[^>]*>[^<]*</span>\s*</div>))\s*(<div className="mx-auto w-\[98%\] h-px mt-2\s*bg-\[#EAECF0\]" />)'
            
            content = re.sub(pattern, replacer, content)
            
            # Case 2: No mb- on heading, but it's directly followed by divider. 
            # We just give the divider my-4 for consistency, OR leave as is but maybe change mt-2 to my-4
            def replacer2(match):
                 heading = match.group(1)
                 divider = match.group(2)
                 new_divider = divider.replace('mt-2', 'mt-4 mb-4')
                 return f"{heading}\n{new_divider}"
                 
            pattern2 = r'(<div className="[^"]*text-\[\d+px\][^"]*font-bold[^"]*">.*?</div(?:>|\s*<span[^>]*>[^<]*</span>\s*</div>))\s*(<div className="mx-auto w-\[98%\] h-px mt-2\s*bg-\[#EAECF0\]" />)'
            content = re.sub(pattern2, replacer2, content)

            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                  
