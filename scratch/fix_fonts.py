import os
import re

files_with_font = []
for root, dirs, files in os.walk('app'):
    for f in files:
        if f.endswith(('.tsx', '.ts')):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8') as file:
                content = file.read()
                if 'Inter_Tight' in content:
                    files_with_font.append(fp)

print(f'Found {len(files_with_font)} files with Inter_Tight')

for fp in files_with_font:
    with open(fp, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace Inter_Tight imports
    new_content = re.sub(r'import\s+\{\s*Inter_Tight\s*,\s*', 'import { ', content)
    new_content = re.sub(r'import\s+\{\s*,\s*Inter_Tight\s*', 'import { ', new_content)
    new_content = re.sub(r'import\s+\{\s*Inter_Tight\s*\}\s*from\s*[\'"]next/font/google[\'"];?\n?', '', new_content)
    new_content = re.sub(r'import\s+\{\s*\}\s*from\s*[\'"]next/font/google[\'"];?\n?', '', new_content)
    
    # Replace instantiation
    new_content = re.sub(r'const\s+(interTight|inter)\s*=\s*Inter_Tight\(\{[^\}]*\}\);?', r'const \1 = { className: "" };', new_content)
    
    with open(fp, 'w', encoding='utf-8') as file:
        file.write(new_content)

print('Finished updating font files successfully!')
