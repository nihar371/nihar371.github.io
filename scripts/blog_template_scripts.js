function setupBlogStructure() {
    const bodyContent = document.getElementsByTagName('body')[0];
    const blogStrucHTML = `
    <div id="blog-post">
        <aside>
            <div id="outline-container">
                <h2>Table of Contents</h2>
                <nav id="toc-nav"></nav>
            </div>
        </aside>
        <div id="blog-main-content">
        </div>
    </div>
    `;
    bodyContent.insertAdjacentHTML('beforeend', blogStrucHTML);

    const elementToMove = document.getElementsByTagName('main')[0];
    const newParentDiv = document.getElementById('blog-main-content');

    newParentDiv.appendChild(elementToMove);
}

// --- Function to generate the table of contents ---
function generateOutline() {
    const mainContent = document.getElementById('blog-main-content');
    const tocNav = document.getElementById('toc-nav');

    if (!mainContent || !tocNav) return;

    const headers = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const root = { level: 0, children: [] };
    let currentPath = [root];
    
    // 💡 NEW: A map to track used IDs to prevent duplicates
    const idCounters = new Map();

    // 💡 NEW: Helper function to create a clean, URL-friendly ID from text
    const slugify = (text) => {
        return text.toString().toLowerCase().trim()
            .replace(/&/g, '-and-')     // Replace & with 'and'
            .replace(/\s+/g, '-')       // Replace spaces with -
            .replace(/[^\w\-]+/g, '')   // Remove all non-word chars except -
            .replace(/\-\-+/g, '-');    // Replace multiple - with single -
    };

    headers.forEach((header) => {
        const level = parseInt(header.tagName.substring(1), 10);

        // Remove any trailing anchor-link text (like the paragraph mark '¶') from header text
        const anchorLink = header.querySelector('.anchor-link');
        let headerText = header.textContent;
        if (anchorLink && anchorLink.textContent) {
            headerText = headerText.replace(anchorLink.textContent, '').trim();
        }

        let baseId = slugify(headerText);
        let headerId;

        // If this ID has been used before, append a counter
        if (idCounters.has(baseId)) {
            const count = idCounters.get(baseId);
            idCounters.set(baseId, count + 1);
            headerId = `${baseId}-${count}`;
        } else {
            idCounters.set(baseId, 1);
            headerId = baseId;
        }

        // Forcefully set the unique ID on the actual header element
        header.id = headerId;

        const node = { level, text: headerText, id: headerId, children: [] };

        while (currentPath[currentPath.length - 1].level >= level) {
            currentPath.pop();
        }
        currentPath[currentPath.length - 1].children.push(node);
        currentPath.push(node);
    });

    const createHtmlList = (nodes) => {
        if (nodes.length === 0) return null;
        const ul = document.createElement('ul');

        nodes.forEach(node => {
            const li = document.createElement('li');
            if (node.children.length > 0) {
                li.classList.add('has-children');
                const toggle = document.createElement('span');
                toggle.classList.add('toggle-arrow', 'expanded');
                toggle.innerHTML = `<svg viewBox="0 0 24 24"><path d="M9.29 15.88L13.17 12 9.29 8.12a.996.996 0 111.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 01-1.41 0c-.38-.39-.39-1.03 0-1.42z"></path></svg>`;
                li.appendChild(toggle);
            }

            const a = document.createElement('a');
            a.href = `#${node.id}`;
            a.textContent = node.text;
            a.dataset.targetId = node.id;
            li.appendChild(a);

            if (node.children.length > 0) {
                const childUl = createHtmlList(node.children);
                if (childUl) {
                    childUl.classList.add('toc-children');
                    li.appendChild(childUl);
                }
            }
            ul.appendChild(li);
        });
        return ul;
    };

    const tocHtml = createHtmlList(root.children);
    if (tocHtml) tocNav.appendChild(tocHtml);

    tocNav.addEventListener('click', (e) => {
        const toggle = e.target.closest('.toggle-arrow');
        if (toggle) {
            const childUl = toggle.closest('li').querySelector('.toc-children');
            if (childUl) {
                toggle.classList.toggle('expanded');
                childUl.classList.toggle('collapsed');
            }
        }
    });

    const tocLinks = tocNav.querySelectorAll('a');
    const headerElements = Array.from(headers);

    const onScroll = () => {
        let currentActiveId = null;
        const scrollPosition = window.scrollY + 150;
        for (const header of headerElements) {
            if (header.offsetTop <= scrollPosition) {
                currentActiveId = header.id;
            } else {
                break;
            }
        }
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.targetId === currentActiveId) {
                link.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
}

// --- Main execution flow ---
document.addEventListener('DOMContentLoaded', () => {
    // Step 1: Restructure the DOM first.
    setupBlogStructure();

    // Step 2: Generate the outline based on the new structure.
    generateOutline();

    // Temp. Fix for graphs
    window.dispatchEvent(new Event('resize'));
});