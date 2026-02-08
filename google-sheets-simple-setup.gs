/**
 * LANDWISE - SIMPLE GOOGLE SHEETS SETUP
 * 
 * FASTER, LIGHTWEIGHT VERSION - Runs in ~10 seconds
 * 
 * HOW TO USE:
 * 1. Open Google Sheets (new blank sheet)
 * 2. Extensions → Apps Script
 * 3. Delete default code, paste this script
 * 4. Click Save (💾)
 * 5. Select "quickSetup" from dropdown
 * 6. Click Run (▶️)
 * 7. Authorize when prompted
 * 
 * Version: 1.1 (Fast)
 */

function quickSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get or rename first sheet to 'Leads'
  let sheet = ss.getSheetByName('Leads');
  
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName('Leads');
  }
  
  // Clear any existing content
  sheet.clear();
  
  // Set up headers
  const headers = [
    'Date', 'Name', 'Contact', 'Service', 'Location', 'Status', 'Form Type', 'Notes', 'Follow-up'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#1F3D2B')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center');
  
  // Set column widths
  const widths = [150, 150, 180, 180, 180, 130, 130, 250, 130];
  widths.forEach((width, i) => sheet.setColumnWidth(i + 1, width));
  
  // Freeze header
  sheet.setFrozenRows(1);
  
  // Add status dropdown (F column, rows 2-500)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'Contacted', 'Survey Scheduled', 'Completed', 'Closed'], true)
    .build();
  sheet.getRange('F2:F500').setDataValidation(statusRule);
  
  // Add conditional formatting colors
  const rules = [];
  
  // New = Yellow
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('New')
    .setBackground('#FFF9C4')
    .setRanges([sheet.getRange('F2:F500')])
    .build());
  
  // Contacted = Blue
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Contacted')
    .setBackground('#BBDEFB')
    .setRanges([sheet.getRange('F2:F500')])
    .build());
  
  // Survey Scheduled = Orange
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Survey Scheduled')
    .setBackground('#FFE0B2')
    .setRanges([sheet.getRange('F2:F500')])
    .build());
  
  // Completed = Green
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Completed')
    .setBackground('#C8E6C9')
    .setRanges([sheet.getRange('F2:F500')])
    .build());
  
  // Closed = Grey
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Closed')
    .setBackground('#EEEEEE')
    .setRanges([sheet.getRange('F2:F500')])
    .build());
  
  sheet.setConditionalFormatRules(rules);
  
  // Format date columns
  sheet.getRange('A2:A500').setNumberFormat('yyyy-mm-dd hh:mm');
  sheet.getRange('I2:I500').setNumberFormat('yyyy-mm-dd');
  
  // Add sample row
  sheet.getRange('A2:I2').setValues([[
    new Date(), 
    'Sample Lead', 
    'sample@example.com', 
    'Land Snapshot', 
    'Koh Phangan', 
    'New', 
    'Contact Form', 
    'Delete this sample row when ready',
    ''
  ]]);
  
  // Create Dashboard sheet
  createSimpleDashboard(ss);
  
  // Success message
  SpreadsheetApp.getUi().alert(
    '✅ Setup Complete!',
    'Your lead tracker is ready!\n\n' +
    '→ "Leads" tab to enter data\n' +
    '→ "Dashboard" tab to view metrics\n\n' +
    'Delete the sample row in Leads when ready.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function createSimpleDashboard(ss) {
  // Get existing Dashboard or create new one
  let dashboard = ss.getSheetByName('Dashboard');
  
  if (dashboard) {
    // Clear existing content
    dashboard.clear();
  } else {
    // Create new sheet at position 0
    dashboard = ss.insertSheet('Dashboard', 0);
  }
  
  // Title
  dashboard.getRange('A1:D1').merge()
    .setValue('📊 LandWise Lead Dashboard')
    .setBackground('#1F3D2B')
    .setFontColor('#FFFFFF')
    .setFontSize(16)
    .setFontWeight('bold')
    .setVerticalAlignment('middle');
  dashboard.setRowHeight(1, 50);
  
  // Metrics
  const metrics = [
    ['', ''],
    ['Status', 'Count'],
    ['🟡 New', '=COUNTIF(Leads!F:F,"New")'],
    ['🔵 Contacted', '=COUNTIF(Leads!F:F,"Contacted")'],
    ['🟠 Survey Scheduled', '=COUNTIF(Leads!F:F,"Survey Scheduled")'],
    ['🟢 Completed', '=COUNTIF(Leads!F:F,"Completed")'],
    ['⚪ Closed', '=COUNTIF(Leads!F:F,"Closed")'],
    ['', ''],
    ['📊 Total Active', '=COUNTIFS(Leads!F:F,"<>Closed",Leads!F:F,"<>")'],
    ['📧 Total Leads', '=COUNTA(Leads!A:A)-1']
  ];
  
  dashboard.getRange(2, 1, metrics.length, 2).setValues(metrics);
  dashboard.getRange('A3:B3').setFontWeight('bold').setBackground('#F4F4F2');
  dashboard.getRange('B4:B11').setHorizontalAlignment('center');
  
  // Column widths
  dashboard.setColumnWidth(1, 200);
  dashboard.setColumnWidth(2, 100);
}

/**
 * Custom menu - runs automatically when sheet opens
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎯 LandWise')
    .addItem('⚡ Quick Setup', 'quickSetup')
    .addItem('📊 Refresh Dashboard', 'refreshDashboard')
    .addToUi();
}

function refreshDashboard() {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dashboard').getDataRange().getValues();
  SpreadsheetApp.getUi().alert('✅ Dashboard refreshed!');
}
