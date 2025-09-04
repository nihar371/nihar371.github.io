document.addEventListener('DOMContentLoaded', () => {
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



    const mainContent = document.getElementsByTagName('main')[0];
    const tocNav = document.getElementById('toc-nav');

    if (!mainContent || !tocNav) {
        console.error("Required elements ('main-content' or 'toc-nav') not found.");
        return;
    }

    // Find all header tags within the main content area
    const headers = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');

    // Create a root for our tree structure
    const root = { level: 0, children: [] };
    let currentPath = [root];

    headers.forEach((header, index) => {
        const level = parseInt(header.tagName.substring(1), 10);

        // Create a unique ID for the header to link to
        const headerId = header.id || `header-${index}`;
        if (!header.id) {
            header.id = headerId;
        }

        const node = {
            level: level,
            text: header.textContent,
            id: headerId,
            children: []
        };

        // Find the correct parent in the current path
        while (currentPath[currentPath.length - 1].level >= level) {
            currentPath.pop();
        }

        // Add the new node to its parent's children
        currentPath[currentPath.length - 1].children.push(node);
        currentPath.push(node);
    });

    // Function to recursively generate the HTML list from the tree
    const createHtmlList = (nodes) => {
        if (nodes.length === 0) return '';

        const ul = document.createElement('ul');
        nodes.forEach(node => {
            const li = document.createElement('li');

            // Style list items based on header level
            if (node.level > 1) {
                li.style.paddingLeft = `${(node.level - 1) * 1}rem`;
            }
            if (node.level > 2) {
                li.style.fontSize = '0.9em';
            }

            const a = document.createElement('a');
            a.href = `#${node.id}`;
            a.textContent = node.text;
            a.className = 'block py-1 text-gray-600 hover:text-blue-500 transition-colors duration-200';
            a.dataset.targetId = node.id; // Store target id for scrollspy

            li.appendChild(a);

            // Recursively add children
            if (node.children.length > 0) {
                li.appendChild(createHtmlList(node.children));
            }

            ul.appendChild(li);
        });
        return ul;
    };

    const tocHtml = createHtmlList(root.children);
    if (tocHtml) {
        tocNav.appendChild(tocHtml);
    } else {
        tocNav.innerHTML = '<p class="text-gray-500">No headers found.</p>';
    }

    // --- Optional: Scrollspy for highlighting the current section ---
    const tocLinks = tocNav.querySelectorAll('a');
    const headerElements = Array.from(headers);

    const onScroll = () => {
        let currentActiveId = null;
        const scrollPosition = window.scrollY + 150; // Offset for better accuracy

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
    onScroll(); // Initial check on load
});