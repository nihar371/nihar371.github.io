Blog Post : Here I will be sharing my thoughts and knowledge, if you think that there might be any errors then please feel free to reach out or contribute!

<!-- =====================================================================================================================
================================================ For Deployers usage ================================================
=====================================================================================================================

                        ========================= Notebook ==> HTML =========================

jupyter-nbconvert <file-name>.ipynb --to html --no-input --HTMLExporter.theme=dark --output index.html

                        ========================= Setting templates =========================

<link rel="stylesheet" href="/styles/basic_page_styles.css">
<link rel="stylesheet" href="/styles/blog_template_styles.css">
<script src="/scripts//basic_page_scripts.js" defer></script>
<link rel="icon" type="image/np-icon" href="/assets/images/favicon/favicon-32x32.png">

=====================================================================================================================
================================================= For Editors usage =================================================
=====================================================================================================================

                        ========================== Centered images ==========================

<center>
    <figure>
    <img src='<file-path>' alt='Figure Name'>
    <figcaption style="font-style: italic;">Fig. 1 : Figure description</figcaption>
    </figure>
</center>

                        ========================= Directory Structure =======================

blog
|
|-- fileName
|   |-- images (for Notebook)
|   |-- audio (for Notebook)
|   |-- otherAssets (for Notebook)
|   |-- *
|   |-- thumbnail (for Blog page)
|   |-- index.html (for Blog)

                        ========================= Reference Structure =======================

## References

<ol>
    <li><a href='link 1'>Link 1 Dispaly</a></li>
    <li><a href='link 2'>Link 2 Display</a></li>
    <li><a href='link 3'>Link 3 Display</a></li>
</ol>

=====================================================================================================================
================================================= For Git Adv usage =================================================
=====================================================================================================================

                        ========================== Git Hist. Clean ==========================

git filter-branch --force --index-filter "git rm --cached --ignore-unmatch <large-file-path>" --prune-empty --tag-name-filter cat -- --all -->