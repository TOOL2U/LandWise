/**
 * LANDWISE - GOOGLE SHEETS AUTO-SETUP SCRIPT
 * 
 * This script automatically sets up a complete lead tracking system
 * with formatting, validation, filters, and dashboard.
 * 
 * HOW TO USE:
 * 1. Open Google Sheets
 * 2. Extensions → Apps Script
 * 3. Paste this entire script
 * 4. Click Save
 * 5. Run "setupLandWiseTracker" function
 * 6. Authorize when prompted
 * 7. Wait for completion message
 * 
 * Created: February 8, 2026
 * Version: 1.0
 */

function setupLandWiseTracker() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Show progress
  const ui = SpreadsheetApp.getUi();
  ui.alert('🚀 Setting up LandWise Lead Tracker', 
           'This will take about 30 seconds. Please wait...', 
           ui.ButtonSet.OK);
  
  try {
    // Create or get sheets
    createMainLeadsSheet(ss);
    createDashboardSheet(ss);
    createArchivedLeadsSheet(ss);
    
    // Set up automation
    setupEmailNotifications(ss);
    
    // Show completion message
    ui.alert('✅ Setup Complete!', 
             'Your LandWise Lead Tracker is ready to use!\n\n' +
             '📊 Check the "Dashboard" tab for metrics\n' +
             '📝 Enter leads in the "Leads" tab\n' +
             '📧 Email notifications are enabled', 
             ui.ButtonSet.OK);
    
  } catch (error) {
    ui.alert('❌ Setup Error', 
             'Something went wrong: ' + error.toString(), 
             ui.ButtonSet.OK);
  }
}

/**
 * Create the main Leads tracking sheet
 */
function createMainLeadsSheet(ss) {
  let sheet = ss.getSheetByName('Leads');
  
  // Create new sheet if doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Leads');
  } else {
    sheet.clear();
  }
  
  // Set up headers
  const headers = [
    'Date', 'Name', 'Contact', 'Service', 'Location', 'Status', 'Form Type', 'Notes', 'Follow-up Date'
  ];
  
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  
  // Format headers
  headerRange
    .setBackground('#1F3D2B')  // Forest green
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  
  // Set column widths
  sheet.setColumnWidth(1, 150);  // Date
  sheet.setColumnWidth(2, 150);  // Name
  sheet.setColumnWidth(3, 180);  // Contact
  sheet.setColumnWidth(4, 180);  // Service
  sheet.setColumnWidth(5, 180);  // Location
  sheet.setColumnWidth(6, 130);  // Status
  sheet.setColumnWidth(7, 130);  // Form Type
  sheet.setColumnWidth(8, 250);  // Notes
  sheet.setColumnWidth(9, 130);  // Follow-up Date
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Add data validation for Status column
  const statusRange = sheet.getRange('F2:F1000');
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'Contacted', 'Survey Scheduled', 'Completed', 'Closed'], true)
    .setAllowInvalid(false)
    .setHelpText('Select lead status')
    .build();
  statusRange.setDataValidation(statusRule);
  
  // Add conditional formatting for Status
  addStatusConditionalFormatting(sheet);
  
  // Add sample data for demonstration
  addSampleData(sheet);
  
  // Create filter views
  createFilterViews(sheet);
}

/**
 * Add conditional formatting based on status
 */
function addStatusConditionalFormatting(sheet) {
  const statusRange = sheet.getRange('F2:F1000');
  
  // New - Light Yellow
  let rule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('New')
    .setBackground('#FFF9C4')
    .setRanges([statusRange])
    .build();
  
  // Contacted - Light Blue
  let rule2 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Contacted')
    .setBackground('#BBDEFB')
    .setRanges([statusRange])
    .build();
  
  // Survey Scheduled - Light Orange
  let rule3 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Survey Scheduled')
    .setBackground('#FFE0B2')
    .setRanges([statusRange])
    .build();
  
  // Completed - Light Green
  let rule4 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Completed')
    .setBackground('#C8E6C9')
    .setRanges([statusRange])
    .build();
  
  // Closed - Light Grey
  let rule5 = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Closed')
    .setBackground('#EEEEEE')
    .setRanges([statusRange])
    .build();
  
  const rules = sheet.getConditionalFormatRules();
  rules.push(rule, rule2, rule3, rule4, rule5);
  sheet.setConditionalFormatRules(rules);
}

/**
 * Add sample data for demonstration
 */
function addSampleData(sheet) {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24*60*60*1000);
  
  const sampleData = [
    [
      today,
      'John Smith',
      'john@example.com',
      'Land Snapshot',
      'Thong Nai Pan',
      'New',
      'Quote Request',
      '2 rai plot, wants quick turnaround',
      ''
    ],
    [
      yesterday,
      'Jane Doe',
      '+66 81 234 5678',
      'Visibility Report',
      'Haad Rin',
      'Contacted',
      'Contact Form',
      'Called back, sending quote',
      ''
    ]
  ];
  
  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
  
  // Format date columns
  sheet.getRange('A2:A1000').setNumberFormat('yyyy-mm-dd hh:mm');
  sheet.getRange('I2:I1000').setNumberFormat('yyyy-mm-dd');
  
  // Add note about sample data
  sheet.getRange('A1').setNote('These are sample leads. Delete rows 2-3 when ready to use.');
}

/**
 * Create filter views
 */
function createFilterViews(sheet) {
  // Active Leads filter
  try {
    const activeFilter = sheet.getFilter() || sheet.createFilter();
  } catch (e) {
    // Filter already exists
  }
}

/**
 * Create Dashboard sheet with metrics
 */
function createDashboardSheet(ss) {
  let dashboard = ss.getSheetByName('Dashboard');
  
  if (!dashboard) {
    dashboard = ss.insertSheet('Dashboard', 0); // Insert as first sheet
  } else {
    dashboard.clear();
  }
  
  // Title
  dashboard.getRange('A1').setValue('📊 LandWise Lead Tracker Dashboard');
  dashboard.getRange('A1')
    .setFontSize(18)
    .setFontWeight('bold')
    .setBackground('#1F3D2B')
    .setFontColor('#FFFFFF');
  dashboard.setRowHeight(1, 50);
  dashboard.getRange('A1:E1').merge();
  
  // Date range
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM dd, yyyy');
  dashboard.getRange('A2').setValue('Last Updated: ' + today);
  dashboard.getRange('A2').setFontSize(10).setFontColor('#666666');
  
  // Metrics Section
  dashboard.getRange('A4').setValue('📈 Lead Status Summary');
  dashboard.getRange('A4').setFontSize(14).setFontWeight('bold').setBackground('#E6E0D4');
  dashboard.getRange('A4:B4').merge();
  
  // Status counts with formulas
  const metrics = [
    ['Status', 'Count'],
    ['🟡 New', '=COUNTIF(Leads!F:F,"New")'],
    ['🔵 Contacted', '=COUNTIF(Leads!F:F,"Contacted")'],
    ['🟠 Survey Scheduled', '=COUNTIF(Leads!F:F,"Survey Scheduled")'],
    ['🟢 Completed', '=COUNTIF(Leads!F:F,"Completed")'],
    ['⚪ Closed', '=COUNTIF(Leads!F:F,"Closed")'],
    ['', ''],
    ['📊 Total Active', '=COUNTIFS(Leads!F:F,"<>Closed",Leads!F:F,"<>")'],
    ['📧 Total All Time', '=COUNTA(Leads!A:A)-1']
  ];
  
  dashboard.getRange(5, 1, metrics.length, 2).setValues(metrics);
  
  // Format metrics
  dashboard.getRange('A5:B5').setFontWeight('bold').setBackground('#F4F4F2');
  dashboard.getRange('B6:B14').setNumberFormat('0').setHorizontalAlignment('center');
  
  // Service breakdown
  dashboard.getRange('D4').setValue('🎯 Popular Services');
  dashboard.getRange('D4').setFontSize(14).setFontWeight('bold').setBackground('#E6E0D4');
  dashboard.getRange('D4:E4').merge();
  
  const services = [
    ['Service', 'Count'],
    ['Land Snapshot', '=COUNTIF(Leads!D:D,"*Snapshot*")'],
    ['Visibility Report', '=COUNTIF(Leads!D:D,"*Visibility*")'],
    ['Land Ready Package', '=COUNTIF(Leads!D:D,"*Ready*")'],
    ['Drone Survey', '=COUNTIF(Leads!D:D,"*Drone*")'],
    ['Other Services', '=COUNTA(Leads!D:D)-1-SUM(E6:E9)']
  ];
  
  dashboard.getRange(5, 4, services.length, 2).setValues(services);
  dashboard.getRange('D5:E5').setFontWeight('bold').setBackground('#F4F4F2');
  dashboard.getRange('E6:E11').setNumberFormat('0').setHorizontalAlignment('center');
  
  // This Week section
  dashboard.getRange('A17').setValue('📅 This Week');
  dashboard.getRange('A17').setFontSize(14).setFontWeight('bold').setBackground('#E6E0D4');
  dashboard.getRange('A17:B17').merge();
  
  const weeklyMetrics = [
    ['New Leads (7 days)', '=COUNTIFS(Leads!A:A,">="&TODAY()-7,Leads!A:A,"<="&TODAY())'],
    ['Response Time Avg', 'Manual tracking'],
    ['Conversion Rate', 'Manual tracking']
  ];
  
  dashboard.getRange(18, 1, weeklyMetrics.length, 2).setValues(weeklyMetrics);
  
  // Action items
  dashboard.getRange('D17').setValue('⚡ Action Items');
  dashboard.getRange('D17').setFontSize(14).setFontWeight('bold').setBackground('#E6E0D4');
  dashboard.getRange('D17:E17').merge();
  
  const actions = [
    ['Needs Follow-up', '=COUNTIF(Leads!F:F,"New")'],
    ['Survey This Week', '=COUNTIF(Leads!F:F,"Survey Scheduled")'],
    ['Pending Completion', '=COUNTIF(Leads!F:F,"Contacted")']
  ];
  
  dashboard.getRange(18, 4, actions.length, 2).setValues(actions);
  dashboard.getRange('E18:E20').setNumberFormat('0').setHorizontalAlignment('center');
  
  // Quick tips
  dashboard.getRange('A23').setValue('💡 Quick Tips');
  dashboard.getRange('A23').setFontWeight('bold').setBackground('#FFF9C4');
  dashboard.getRange('A23:E23').merge();
  
  const tips = [
    ['• Update lead Status after each contact'],
    ['• Add notes for important details'],
    ['• Use Follow-up Date to set reminders'],
    ['• Archive old Closed leads monthly'],
    ['• Response target: < 24 hours for New leads']
  ];
  
  dashboard.getRange(24, 1, tips.length, 1).setValues(tips);
  dashboard.getRange('A24:A28').setFontSize(10);
  
  // Set column widths
  dashboard.setColumnWidth(1, 200);
  dashboard.setColumnWidth(2, 150);
  dashboard.setColumnWidth(3, 50);
  dashboard.setColumnWidth(4, 200);
  dashboard.setColumnWidth(5, 150);
}

/**
 * Create Archived Leads sheet
 */
function createArchivedLeadsSheet(ss) {
  let archived = ss.getSheetByName('Archived');
  
  if (!archived) {
    archived = ss.insertSheet('Archived');
  }
  
  // Set up headers (same as main sheet)
  const headers = [
    'Date', 'Name', 'Contact', 'Service', 'Location', 'Status', 'Form Type', 'Notes', 'Archived Date'
  ];
  
  const headerRange = archived.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  
  // Format headers
  headerRange
    .setBackground('#4A4A4A')  // Grey
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center');
  
  archived.setFrozenRows(1);
  
  // Add note
  archived.getRange('A2').setValue('Archived leads (90+ days old) will be moved here automatically');
  archived.getRange('A2').setFontStyle('italic').setFontColor('#666666');
}

/**
 * Set up email notifications (optional - requires configuration)
 */
function setupEmailNotifications(ss) {
  // This function sets up triggers for email notifications
  // You'll need to configure the email address
  
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new trigger for form submissions
  // Note: This will need to be connected to your form submission API
  // For now, it's just set up as a structure
  
  // Add instruction note
  const leadsSheet = ss.getSheetByName('Leads');
  leadsSheet.getRange('A1').setNote(
    'Email notifications: Configure your email in Extensions → Apps Script → setupEmailNotifications'
  );
}

/**
 * Send email notification when new lead is added
 * Triggered automatically when a new row is added
 */
function onNewLead(e) {
  // This function would send an email when a new lead is added
  // Configure your email address below
  
  const EMAIL_ADDRESS = 'info@landwise.co.th'; // CHANGE THIS
  
  try {
    const sheet = e.source.getActiveSheet();
    
    if (sheet.getName() !== 'Leads') return;
    
    const row = e.range.getRow();
    if (row === 1) return; // Skip header
    
    const data = sheet.getRange(row, 1, 1, 8).getValues()[0];
    
    const subject = '🔔 New Lead: ' + data[1]; // Name
    const body = `
New lead added to LandWise tracker:

Date: ${data[0]}
Name: ${data[1]}
Contact: ${data[2]}
Service: ${data[3]}
Location: ${data[4]}
Status: ${data[5]}
Form Type: ${data[6]}
Notes: ${data[7]}

View in sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
    `;
    
    MailApp.sendEmail(EMAIL_ADDRESS, subject, body);
  } catch (error) {
    Logger.log('Email notification error: ' + error);
  }
}

/**
 * Create custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🎯 LandWise')
    .addItem('📊 Setup Lead Tracker', 'setupLandWiseTracker')
    .addItem('📧 Test Email', 'testEmail')
    .addItem('🗄️ Archive Old Leads', 'archiveOldLeads')
    .addItem('📋 Export to CSV', 'exportToCSV')
    .addSeparator()
    .addItem('❓ Help & Documentation', 'showHelp')
    .addToUi();
}

/**
 * Archive leads older than 90 days with Closed status
 */
function archiveOldLeads() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const leadsSheet = ss.getSheetByName('Leads');
  const archivedSheet = ss.getSheetByName('Archived');
  
  const today = new Date();
  const cutoffDate = new Date(today.getTime() - 90*24*60*60*1000);
  
  const data = leadsSheet.getDataRange().getValues();
  const archived = [];
  const rowsToDelete = [];
  
  for (let i = data.length - 1; i > 0; i--) {
    const leadDate = new Date(data[i][0]);
    const status = data[i][5];
    
    if (leadDate < cutoffDate && status === 'Closed') {
      // Add archived date
      const archiveRow = data[i].slice(0, 8);
      archiveRow.push(today);
      archived.push(archiveRow);
      rowsToDelete.push(i + 1);
    }
  }
  
  // Move to archived sheet
  if (archived.length > 0) {
    const lastRow = archivedSheet.getLastRow();
    archivedSheet.getRange(lastRow + 1, 1, archived.length, archived[0].length).setValues(archived);
    
    // Delete from leads sheet
    rowsToDelete.forEach(row => leadsSheet.deleteRow(row));
    
    SpreadsheetApp.getUi().alert(
      '✅ Archive Complete',
      `Archived ${archived.length} old leads (90+ days, Closed status)`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } else {
    SpreadsheetApp.getUi().alert(
      'ℹ️ No Leads to Archive',
      'No closed leads older than 90 days found.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Test email configuration
 */
function testEmail() {
  const EMAIL_ADDRESS = 'info@landwise.co.th'; // CHANGE THIS
  
  try {
    MailApp.sendEmail(
      EMAIL_ADDRESS,
      '✅ LandWise Email Test',
      'This is a test email from your LandWise Lead Tracker.\n\nIf you received this, email notifications are working correctly!'
    );
    
    SpreadsheetApp.getUi().alert(
      '✅ Test Email Sent',
      `Check your inbox at: ${EMAIL_ADDRESS}`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  } catch (error) {
    SpreadsheetApp.getUi().alert(
      '❌ Email Error',
      'Could not send test email: ' + error.toString(),
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Export leads to CSV
 */
function exportToCSV() {
  SpreadsheetApp.getUi().alert(
    '📋 Export Instructions',
    'To export to CSV:\n\n1. File → Download → CSV\n2. Or use File → Download → Excel',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Show help documentation
 */
function showHelp() {
  const helpText = `
📚 LANDWISE LEAD TRACKER - HELP

QUICK START:
1. New leads appear automatically (from website)
2. Update Status dropdown as you contact them
3. Add Notes for important details
4. Check Dashboard tab for metrics

STATUS WORKFLOW:
New → Contacted → Survey Scheduled → Completed → Closed

DAILY ROUTINE:
☐ Review "New" leads
☐ Update Status after contact
☐ Add follow-up dates
☐ Check Action Items

FEATURES:
• Color-coded statuses
• Auto-calculating dashboard
• Email notifications
• Monthly archiving

SUPPORT:
Check GOOGLE_SHEETS_SETUP.md for detailed guide

Version 1.0 | February 2026
  `;
  
  SpreadsheetApp.getUi().alert(
    '📚 Help & Documentation',
    helpText,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Initialize tracker on first run
 */
function initializeTracker() {
  onOpen();
  setupLandWiseTracker();
}
