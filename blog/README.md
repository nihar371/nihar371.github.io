=====================================================================================================================
================================================ For Deployers usage ================================================
=====================================================================================================================

                        ========================= Notebook ==> HTML =========================

jupyter-nbconvert <fileName>.ipynb --to html --no-input --HTMLExporter.theme=dark

                        ========================= Setting templates =========================

<link rel="stylesheet" href="/basic_page_styles.css">
<link rel="stylesheet" href="/blog_template_styles.css">
<script src="/basic_page_scripts.js"></script>
<link rel="icon" type="image/np-icon" href="\assets\images\favicon\favicon-32x32.png">

=====================================================================================================================
================================================= For Editors usage =================================================
=====================================================================================================================

                        ========================== Centered images ==========================

<center>
    <figure>
    <img src='.\\dir-name\\images\\figure.png' alt='Figure Name'>
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
|   |-- thumbnail (for Blog)
|
|-- fileName.html
|
|-- fileName.ipynb

                        ========================= Reference Structure =======================

## References

<ol>
    <li><a href='link 1'>Link 1 Dispaly</a></li>
    <li><a href='link 2'>Link 2 Display</a></li>
    <li><a href='link 3'>Link 3 Display</a></li>
</ol>