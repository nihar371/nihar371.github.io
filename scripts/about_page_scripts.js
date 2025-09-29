function waitForElementObserver(selector, callback) {
  const observer = new MutationObserver((mutations) => {
    if (document.querySelector(selector)) {
      callback();
      observer.disconnect(); // Stop observing after the element is found
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

waitForElementObserver('#about-button', () => {

  const button = document.getElementById('about-button');

  button.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent redirection
    // Add your desired functionality here
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional, for smooth scrolling
    });
  });
});



function setDynamicPadding() {
  const divElement = document.getElementsByClassName('paper')[0];
  const divHeight = divElement.offsetHeight;

  const paddingTop = divHeight * 0.10;
  const paddingBottom = divHeight * 0.20;

  divElement.style.paddingTop = `${paddingTop}px`;
  divElement.style.paddingBottom = `${paddingBottom}px`;
}

window.addEventListener('load', setDynamicPadding);
window.addEventListener('resize', setDynamicPadding);






































document.addEventListener('DOMContentLoaded', async function () {

  // --- CONFIGURATION VARIABLES ---
  // Font Sizes
  const titleFontSize = 20;
  const subtitleFontSize = 18;
  const detailFontSize = 16;
  const yearLabelFontSize = 64;
  const monthLabelFontSize = 12;
  const todayLabelFontSize = 14;

  // Font Families
  const defaultfontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-family-primary').trim();
  const titleFontFamily = defaultfontFamily;
  const subtitleFontFamily = defaultfontFamily;
  const detailsFontFamily = defaultfontFamily;
  const axisFontFamily = defaultfontFamily;

  // Colors from CSS Variables
  const computedStyles = getComputedStyle(document.documentElement);
  const barWorkColor = computedStyles.getPropertyValue('--bar-work-color').trim();
  const barEducationColor = computedStyles.getPropertyValue('--bar-education-color').trim();
  const barTextColor = computedStyles.getPropertyValue('--bar-text-color').trim();
  const yearLabelColor = computedStyles.getPropertyValue('--year-label-color').trim();
  const gridLineColor = computedStyles.getPropertyValue('--grid-line-color').trim();


  // --- DATA SETUP ---
  const workData = [
    {
      "label": "Data Developer",
      "institution": "ADP",
      "start": "2025-05-26",
      "end": "2025-07-18",
      "logo": "/assets/images/logos/adp-logo.png",
      "details": [
        "Optimized ETL pipelines and PySpark jobs in Databricks, automating data processing and saving over $1,200 monthly.",
        "Architected a two-stage data warehousing solution using AWS services like S3, Redshift, Lambda, and Glue for a modernized, scheduled workflow.",
        "Delivered actionable insights by developing 4+ automated reporting workflows and interactive Power BI dashboards for KPI monitoring.",
        "Managed the full project lifecycle, codebase, and knowledge base using Docker, Git, Bitbucket, Jira, and Confluence."
      ]
    },
    {
      "label": "Data Science Teaching Assistant",
      "institution": "Stevens Institute of Technology",
      "start": "2024-07-08",
      "end": "2025-05-17",
      "logo": "/assets/images/logos/stevens-logo.png",
      "details": [
        "Assisted Prof. Pedro Vilanova-Guerra and Prof. Paul Schwartz in MA576: Optimization for Data Science, and MA540: Probability Theory respectively.",
        "Assisted Prof. Tewodros Zewde in conducting the AI Workshop for the Summer Pre-College Program 2024.",
        "Taught how to code in Python from scratch to building and training a Multi-Layer Perceptron, including working with ML libraries such as Numpy, Pandas, Matplotlib, and Scikit-Learn.",
        "Covered and discussed advanced topics during the lectures, such as Responsible AI, Supervised and Unsupervised Learning, Neural Networks, CNNs, and Generative AI, to illustrate their relevance and applications in daily life."
      ]
    },
    {
      "label": "Data Scientist",
      "institution": "EFFE Studios",
      "start": "2022-08-01",
      "end": "2023-08-11",
      "logo": "/assets/images/logos/effe-studio-logo.png",
      "details": [
        "Led a 5-member team to architect and deploy an end-to-end CI/CD MLOps pipeline using GCP and Firebase for real-time analytics.",
        "Drove a 25% increase in user retention by conducting multiple A/B tests and performing causal inference on website development changes.",
        "Engineered and optimized Unity ML Agents with Reinforcement Learning (RL) techniques, achieving a 1.5x performance boost in decision-making processes.",
        "Resolved model degradation by hyper-tuning an XGBoost model to correct for data drift, significantly improving its predictive accuracy."
      ]
    },
    {
      "label": "Machine Learning Engineer",
      "institution": "MICxN Lab",
      "start": "2020-08-01",
      "end": "2022-07-31",
      "logo": "/assets/images/logos/micxn-lab-logo.png",
      "details": [
        "Decreased prediction error rates by 17% for a computer vision-based traffic mitigation system by implementing Temporal Convolutional Networks.",
        "Developed deep learning models, including RNNs and LSTMs, to successfully identify underlying congestion patterns from time-series data.",
        "Improved model accuracy beyond benchmarks by applying advanced techniques such as image augmentation and Bayesian optimization for hyperparameter tuning.",
        "Engineered a complete codebase migration from TensorFlow to PyTorch and utilized the CUDA Toolkit, resulting in an exponential drop in runtime."
      ]
    }
  ];
  const educationData = [
    {
      label: 'M.S. in Data Science',
      institution: 'Stevens Institute of Technology',
      start: '2023-09-01',
      end: '2025-05-17',
      logo: '/assets/images/logos/stevens-logo.png',
      details: [
        "Provost Scholarship: Received a Merit-based scholarship of 8,000 USD.",
        "Math Olympiad Volunteer: Helped students solve their doubts, and assisted in the grading process. Supervised the examination for 5th Graders to ensure compliance with the rules. Assisted in organizing and coordinating logistical aspects of the event. Managed the registration and departure processes for participants including check-ins and check-outs.",
        "CGPA: 3.9/4.0"
      ]
    },
    {
      label: 'B.Tech. in Computer Science and Engineering',
      institution: 'Ahmedabad University',
      start: '2019-08-11',
      end: '2023-05-26',
      logo: '/assets/images/logos/ahmedabad-uni-logo.png',
      details: [
        "MYSY Scholarship: Received a Merit-based scholarship of 50,000 INR per sem (2X).",
        "High-on Life NGO Volunteer: Done a thorough analysis based on the past data, collected through the survey, of the organization. Made posters and adverting products to spread the idea of a 'Drug-free India' among the younger generation. Implemented several decisions for the betterment of the organization based on the processed data. Data Visualization and Presentation were a part of my job, during the internship"
      ]
    }
  ];

  const allData = [
    ...workData.map(item => ({ ...item, type: 'work' })),
    ...educationData.map(item => ({ ...item, type: 'education' }))
  ];
  allData.sort((a, b) => new Date(a.start) - new Date(b.start));

  const lanes = [];
  allData.forEach(item => {
    let placedInLane = false;
    for (let i = 0; i < lanes.length; i++) {
      if (new Date(item.start) >= lanes[i]) {
        item.lane = i;
        lanes[i] = new Date(item.end);
        placedInLane = true;
        break;
      }
    }
    if (!placedInLane) {
      item.lane = lanes.length;
      lanes.push(new Date(item.end));
    }
  });
  const numLanes = lanes.length;

  const canvasWrapper = document.querySelector('.canvas-wrapper');
  const desiredBarThickness = 160;
  const xAxisHeight = 80;
  const logoProtrusionHeight = 60;
  const logoClearancePadding = 10;
  const desiredBarPadding = logoProtrusionHeight + logoClearancePadding;
  const heightPerLane = desiredBarThickness + desiredBarPadding;
  const barPercentage = desiredBarThickness / heightPerLane;
  canvasWrapper.style.height = `${(numLanes * heightPerLane) + xAxisHeight + logoProtrusionHeight}px`;

  const imagePromises = allData.map(item => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = item.logo;
      item.logoImage = img;
      img.onload = () => resolve();
      img.onerror = () => {
        const placeholder = new Image();
        const initial = item.institution.charAt(0);
        placeholder.src = `https://placehold.co/100x100/f1f1f1/7b7b7b?text=${initial}`;
        item.logoImage = placeholder;
        placeholder.onload = () => resolve();
        placeholder.onerror = () => resolve();
      };
    });
  });
  await Promise.all(imagePromises);

  function drawBarContent(chart, bar, item) {
    const { ctx, chartArea } = chart;
    const { base, x, y, height } = bar.getProps(['base', 'x', 'y', 'height']);
    const barStart = base, barEnd = x, width = barEnd - barStart;

    const visibleBarStart = Math.max(barStart, chartArea.left);
    const visibleBarEnd = Math.min(barEnd, chartArea.right);
    const visibleWidth = visibleBarEnd - visibleBarStart;
    if (visibleWidth < 50) return;

    const padding = 20;
    const titleLineHeight = titleFontSize * 1.2;
    const subtitleLineHeight = subtitleFontSize * 1.3;
    const detailLineHeight = detailFontSize * 1.5;

    const logoSize = Math.min(height - padding * 2, 70);
    if (logoSize > 0) {
      const logoX = visibleBarStart + padding;
      const logoY = y - height / 2 - logoSize / 2;
      const cornerRadius = 8;

      if (logoX + logoSize <= visibleBarEnd) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(logoX, logoY, logoSize, logoSize, cornerRadius);
        ctx.clip();
        if (item.logoImage && item.logoImage.complete) {
          ctx.drawImage(item.logoImage, logoX, logoY, logoSize, logoSize);
        }
        ctx.restore();
      }
    }

    const textX = visibleBarStart + padding + logoSize + padding;
    const availableTextWidth = visibleBarEnd - textX;

    if (availableTextWidth > 50) {
      ctx.font = `bold ${titleFontSize}px ${titleFontFamily}`;
      let titleText = item.label;
      if (ctx.measureText(titleText).width > availableTextWidth) {
        while (ctx.measureText(titleText + '...').width > availableTextWidth && titleText.length > 1) {
          titleText = titleText.slice(0, -1);
        }
        titleText += '...';
      }

      ctx.font = `${subtitleFontSize}px ${subtitleFontFamily}`;
      let subtitleText = item.institution;
      if (ctx.measureText(subtitleText).width > availableTextWidth) {
        while (ctx.measureText(subtitleText + '...').width > availableTextWidth && subtitleText.length > 1) {
          subtitleText = subtitleText.slice(0, -1);
        }
        subtitleText += '...';
      }

      const titleBlockHeight = titleLineHeight + subtitleLineHeight;
      const bgPadding = { x: 12, y: 8 };

      ctx.font = `bold ${titleFontSize}px ${titleFontFamily}`;
      const titleWidth = ctx.measureText(titleText).width;
      ctx.font = `${subtitleFontSize}px ${subtitleFontFamily}`;
      const subtitleWidth = ctx.measureText(subtitleText).width;

      const textBlockMaxWidth = Math.max(titleWidth, subtitleWidth);
      const bgWidth = textBlockMaxWidth + (bgPadding.x * 2);
      const bgHeight = titleBlockHeight + (bgPadding.y * 2);
      const bgX = textX - bgPadding.x;
      const bgY = y - height / 2 - bgHeight / 2;

      if (textX + textBlockMaxWidth < visibleBarEnd) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bgX, bgY, bgWidth, bgHeight, 10);
        ctx.fill();
        ctx.stroke();
      }

      let currentTitleY = bgY + bgPadding.y;
      ctx.fillStyle = barTextColor;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.font = `bold ${titleFontSize}px ${titleFontFamily}`;
      ctx.fillText(titleText, textX, currentTitleY);
      currentTitleY += titleLineHeight;
      ctx.font = `${subtitleFontSize}px ${subtitleFontFamily}`;
      ctx.fillText(subtitleText, textX, currentTitleY);
    }

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(barStart, y - height / 2, width, height, 15);
    ctx.clip();

    const detailsPadding = 15;
    const detailsLeftX = visibleBarStart + detailsPadding;
    const availableDetailsWidth = visibleBarEnd - detailsLeftX - detailsPadding;

    if (item.details && availableDetailsWidth > 20) {
      const logoBottomBoundary = (y - height / 2) + (logoSize / 2);
      let currentDetailY = logoBottomBoundary + (detailsPadding / 2);

      ctx.fillStyle = barTextColor;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = `${detailFontSize}px ${detailsFontFamily}`;

      for (const detail of item.details) {
        if (currentDetailY + detailLineHeight > y + height / 2) break;

        let truncatedText = `• ${detail}`;
        if (ctx.measureText(truncatedText).width > availableDetailsWidth) {
          while (ctx.measureText(truncatedText + '...').width > availableDetailsWidth && truncatedText.length > 1) {
            truncatedText = truncatedText.slice(0, -1);
          }
          truncatedText += '...';
        }
        ctx.fillText(truncatedText, detailsLeftX, currentDetailY);
        currentDetailY += detailLineHeight;
      }
    }
    ctx.restore();
  }


  const customTimeAxisPlugin = {
    id: 'customTimeAxis',
    afterDatasetsDraw: (chart) => {
      const { ctx, chartArea, scales: { x } } = chart;
      if (!chartArea) return;
      ctx.save();

      const today = new Date();
      const todayPixel = x.getPixelForValue(today);

      if (todayPixel >= chartArea.left && todayPixel <= chartArea.right) {
        ctx.beginPath();
        ctx.moveTo(todayPixel, chartArea.top);
        ctx.lineTo(todayPixel, chartArea.bottom);
        ctx.strokeStyle = 'rgba(255, 132, 0, 0.81)';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(255, 55, 0, 0.94)';
        ctx.textAlign = 'center';
        ctx.font = `bold ${todayLabelFontSize}px ${axisFontFamily}`;
        ctx.fillText('Today', todayPixel, chartArea.top - 14);
      }

      ctx.font = `bold ${yearLabelFontSize}px ${axisFontFamily}`;
      const requiredSpace = ctx.measureText('2025').width + 20;
      const pixelPerYear = x.getPixelForValue(new Date(2021, 0, 1)) - x.getPixelForValue(new Date(2020, 0, 1));
      const visibleDurationMs = x.max - x.min;
      // console.log(x.get)
      const approxVisibleYears = visibleDurationMs / 31557600000;
      let yearIncrement = 1;
      if (approxVisibleYears > 40) {
        yearIncrement = 10;
      } else if (approxVisibleYears > 20) {
        yearIncrement = 5;
      } else if (approxVisibleYears > 10) {
        yearIncrement = 2;
      }

      if (pixelPerYear > 0) {
        while ((pixelPerYear * yearIncrement) < requiredSpace) {
          yearIncrement = 2 * yearIncrement;
        }
      }

      const startYear = new Date(x.min).getFullYear();
      const endYear = new Date(x.max).getFullYear() + 1;
      const yLabelPos = chartArea.bottom + 10;
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const SHOW_MID_YEAR_THRESHOLD = 250;
      const SHOW_QUARTERLY_THRESHOLD = 500;
      const SHOW_ALL_MONTHS_THRESHOLD = 900;

      for (let year = startYear; year <= endYear; year++) {
        if (year % yearIncrement !== 0) {
          continue;
        }

        const yearStartPixel = x.getPixelForValue(new Date(year, 0, 1));

        if (yearStartPixel >= chartArea.left && yearStartPixel <= chartArea.right) {
          ctx.beginPath();
          ctx.moveTo(yearStartPixel, chartArea.top);
          ctx.lineTo(yearStartPixel, chartArea.bottom);
          ctx.strokeStyle = gridLineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        const yearLabel = year.toString();
        ctx.fillStyle = yearLabelColor;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = `bold ${yearLabelFontSize}px ${axisFontFamily}`;
        ctx.fillText(yearLabel, yearStartPixel + 5, yLabelPos);
        const yearLabelWidth = ctx.measureText(yearLabel).width;
        const yearPixelWidth = pixelPerYear;

        if (yearPixelWidth * yearIncrement > SHOW_MID_YEAR_THRESHOLD) {
          let monthsToShow = [];
          if (yearPixelWidth * yearIncrement > SHOW_ALL_MONTHS_THRESHOLD) {
            monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
          } else if (yearPixelWidth * yearIncrement > SHOW_QUARTERLY_THRESHOLD) {
            monthsToShow = [3, 6, 9];
          } else {
            monthsToShow = [6];
          }

          const monthLabelY = yLabelPos + 25;
          ctx.font = `${monthLabelFontSize}px ${axisFontFamily}`;
          ctx.fillStyle = yearLabelColor;
          ctx.textAlign = 'center';

          const yearLabelEndX = yearStartPixel + 5 + yearLabelWidth + 15;

          for (const monthIndex of monthsToShow) {
            const monthDate = new Date(year, monthIndex, 1);
            const monthPixel = x.getPixelForValue(monthDate);
            if (monthPixel < yearLabelEndX) {
              continue;
            }
            if (monthPixel >= chartArea.left && monthPixel <= chartArea.right) {
              ctx.beginPath();
              ctx.moveTo(monthPixel, chartArea.bottom);
              ctx.lineTo(monthPixel, chartArea.bottom + 5);
              ctx.strokeStyle = gridLineColor;
              ctx.stroke();
              ctx.fillText(monthNames[monthIndex], monthPixel, monthLabelY);
            }
          }
        }
      }
      ctx.restore();
    }
  };

  const barContentPlugin = {
    id: 'barContentPlugin',
    afterDatasetsDraw(chart) {
      chart.getDatasetMeta(0).data.forEach((bar, index) => drawBarContent(chart, bar, allData[index]));
    }
  };

  // --- NEW: Helper function to draw a single styled tooltip ---
  function drawDateTooltip(chart, barProps, dateString, side) {
    const { ctx, chartArea } = chart;

    // Style Configuration
    const tooltipPadding = 8;
    const tooltipFontSize = 14;
    const tooltipBgColor = 'rgba(28, 28, 32, 0.54)';
    const tooltipBorderColor = 'rgba(255, 255, 255, 0.5)';
    const tooltipTextColor = '#FFFFFF';
    const tooltipBorderRadius = 6;
    const connectorColor = 'rgba(255, 255, 255, 0.7)';
    const connectorHeight = 45;
    const pointerSize = 5;

    // Calculations
    ctx.font = `bold ${tooltipFontSize}px ${defaultfontFamily}`;
    const textMetrics = ctx.measureText(dateString);
    const tooltipWidth = textMetrics.width + 2 * tooltipPadding;
    const tooltipHeight = tooltipFontSize + 2 * tooltipPadding;

    const barTopY = barProps.y - barProps.height / 2;
    const tooltipBottomY = barTopY - connectorHeight;
    const tooltipY = tooltipBottomY - tooltipHeight;

    let connectorX;
    if (side === 'left') {
      connectorX = barProps.base;
    } else { // 'right'
      connectorX = barProps.x;
    }

    // Don't draw if the anchor point is off the screen
    if (connectorX < chartArea.left || connectorX > chartArea.right) {
      return;
    }

    let tooltipX = connectorX - tooltipWidth / 2;

    // Boundary checks to prevent drawing off-canvas
    if (tooltipX < chartArea.left) {
      tooltipX = chartArea.left;
    }
    if (tooltipX + tooltipWidth > chartArea.right) {
      tooltipX = chartArea.right - tooltipWidth;
    }

    // --- Drawing ---
    ctx.save();

    // 1. Draw Tooltip Box
    ctx.fillStyle = tooltipBgColor;
    ctx.strokeStyle = tooltipBorderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, tooltipBorderRadius);
    ctx.fill();
    ctx.stroke();

    // 2. Draw Connector Line
    ctx.setLineDash([5, 5]); // Creates a dash-and-gap pattern of 5 pixels each.

    ctx.beginPath();
    ctx.strokeStyle = connectorColor;
    ctx.lineWidth = 1.5;
    ctx.moveTo(connectorX, barTopY);
    ctx.lineTo(connectorX, tooltipBottomY);
    ctx.stroke();

    // Important: Add this line to revert to a solid line for future drawings
    ctx.setLineDash([]);

    // 3. Draw Pointer Triangle (pointing up towards the bar)
    ctx.beginPath();
    ctx.fillStyle = tooltipBgColor; // Match the box background
    ctx.moveTo(connectorX, tooltipBottomY + pointerSize);
    ctx.lineTo(connectorX - pointerSize, tooltipBottomY);
    ctx.lineTo(connectorX + pointerSize, tooltipBottomY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke(); // Add a border to the pointer

    // 4. Draw Text
    ctx.fillStyle = tooltipTextColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      dateString,
      tooltipX + tooltipWidth / 2,
      tooltipY + tooltipHeight / 2
    );

    ctx.restore();
  }

  // --- NEW: Custom plugin for dual tooltips ---
  const customTooltipsPlugin = {
    id: 'customTooltips',
    afterDraw: (chart) => {
      const tooltip = chart.tooltip;
      if (!tooltip || !tooltip.getActiveElements().length) {
        return; // Exit if no bar is hovered
      }

      const activeElement = tooltip.getActiveElements()[0];
      const item = allData[activeElement.index];
      const barProps = activeElement.element.getProps(['x', 'y', 'base', 'height']);

      // Format dates
      const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      const startDate = new Date(item.start).toLocaleDateString(undefined, dateOptions);
      const endDateObj = new Date(item.end);
      const endDate = !isNaN(endDateObj.getTime())
        ? endDateObj.toLocaleDateString(undefined, dateOptions)
        : 'Present';

      // Draw both tooltips
      drawDateTooltip(chart, barProps, startDate, 'left');
      drawDateTooltip(chart, barProps, endDate, 'right');
    }
  };

  // --- Register all plugins (including the new one) ---
  Chart.register(customTimeAxisPlugin, barContentPlugin, customTooltipsPlugin, ChartZoom);

  const allDateObjects = allData.flatMap(item => {
    const endDate = (item.end instanceof Date && !isNaN(item.end)) ? item.end : new Date(item.end);
    return [new Date(item.start), endDate];
  });

  const allTimestamps = allDateObjects.map(date => date.getTime());
  const overallMinDate = new Date(Math.min(...allTimestamps));
  const overallMaxDate = new Date(Math.max(...allTimestamps));
  const limitMin = overallMinDate.getTime();
  const limitMax = overallMaxDate.getTime();
  const totalTimeSpan = overallMaxDate.getTime() - overallMinDate.getTime();
  const PADDING_FOR_MAX_ZOOM_MONTHS = 2;
  const maxZoomRange = totalTimeSpan + (1000 * 60 * 60 * 24 * 30 * PADDING_FOR_MAX_ZOOM_MONTHS);
  const PADDING_MONTHS = 2;
  const today = new Date();
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(today.getFullYear() - 1);
  const paddedToday = new Date();
  paddedToday.setMonth(today.getMonth() + 2);
  const viewMin = twoYearsAgo.getTime();
  const viewMax = paddedToday.getTime();

  const ctx = document.getElementById('ganttChart').getContext('2d');

  // Ensure touch gestures (pinch) are delivered to the canvas instead of being intercepted by the browser
  // This allows the Chart.js zoom plugin to receive pinch events on mobile devices.
  try {
    const canvas = ctx.canvas || document.getElementById('ganttChart');
    // 'none' allows all pointer gestures on the element (including pinch); adjust if you want some native scrolling
    canvas.style.touchAction = 'none';
  } catch (e) {
    // Ignore if setting style fails in some environments
  }

  let zoomedBarIndex = null;
  let previousZoomState = null;

  const ganttChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Array.from({ length: numLanes }, (_, i) => i.toString()),
      datasets: [{
        data: allData.map(item => ({ x: [new Date(item.start), new Date(item.end)], y: item.lane.toString() })),
        backgroundColor: allData.map(item => item.type === 'work' ? barWorkColor : barEducationColor),
        barPercentage: barPercentage,
        categoryPercentage: 1.0,
        borderRadius: 15,
        borderSkipped: false
      }]
    },
    options: {
      onClick: (event, elements) => {
        if (elements.length === 0) {
          if (zoomedBarIndex !== null && previousZoomState) {
            ganttChart.zoomScale('x', previousZoomState, 'default');
            zoomedBarIndex = null;
            previousZoomState = null;
          }
          return;
        }

        const clickedIndex = elements[0].index;

        if (zoomedBarIndex === clickedIndex) {
          if (previousZoomState) {
            ganttChart.zoomScale('x', previousZoomState, 'default');
            zoomedBarIndex = null;
            previousZoomState = null;
          }
        } else {
          const clickedItem = allData[clickedIndex];

          if (zoomedBarIndex === null) {
            previousZoomState = {
              min: ganttChart.scales.x.min,
              max: ganttChart.scales.x.max,
            };
          }

          let itemEndDate = new Date(clickedItem.end);
          if (isNaN(itemEndDate.getTime())) {
            itemEndDate = clickedItem.end instanceof Date ? clickedItem.end : new Date();
          }

          ganttChart.zoomScale('x', {
            min: new Date(clickedItem.start).getTime(),
            max: itemEndDate.getTime(),
          }, 'default');

          zoomedBarIndex = clickedIndex;
        }
      },
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { bottom: xAxisHeight, top: logoProtrusionHeight + 40 } }, // Increased top padding for tooltips
      scales: {
        x: {
          type: 'time',
          min: viewMin,
          max: viewMax,
          grid: { display: false },
          ticks: { display: false }
        },
        y: {
          type: 'category',
          grid: { display: false },
          ticks: { display: false }
        }
      },
      plugins: {
        legend: { display: false },
        // --- MODIFIED: Disable the default tooltip ---
        tooltip: {
          enabled: false,
          external: () => { } // Using external to fully take control, preventing flickering
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
            limits: { x: { min: limitMin, max: limitMax } }
          },
          zoom: {
              wheel: { enabled: true },
              // Enable pinch (two-finger) zoom for touch devices
              pinch: { enabled: true },
            mode: 'x',
            limits: {
              x: {
                min: limitMin,
                max: limitMax,
                maxRange: maxZoomRange
              }
            },
            onZoomComplete: ({ chart }) => {
              chart.update('none');
            }
          }
        }
      }
    }
  });

  const PAN_SPEED_PIXELS = 5; let panDirection = 0; let animationFrameId = null;
  const smoothPanLoop = () => {
    if (panDirection === 0) { animationFrameId = null; return; }
    ganttChart.pan({ x: panDirection * PAN_SPEED_PIXELS });
    animationFrameId = requestAnimationFrame(smoothPanLoop);
  };
  document.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    if (event.key.toLowerCase() === 'a') { panDirection = 1; }
    else if (event.key.toLowerCase() === 'd') { panDirection = -1; }
    if (panDirection !== 0 && animationFrameId === null) { smoothPanLoop(); }
  });
  document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if ((key === 'a' && panDirection === 1) || (key === 'd' && panDirection === -1)) { panDirection = 0; }
  });
});