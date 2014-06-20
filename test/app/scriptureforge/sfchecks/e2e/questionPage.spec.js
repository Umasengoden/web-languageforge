'use strict';

describe('the question page', function() {
	var projectListPage = require('../../../pages/projectsPage.js');
	var projectPage = require('../../../pages/projectPage.js');
	var textPage = require('../../../pages/textPage.js');
	var textSettingsPage = require('../../../pages/textSettingsPage.js');
	var page = require('../../../pages/questionPage.js');
	var loginPage = require('../../../pages/loginPage.js');
	var util = require('../../../pages/util.js');
	var constants = require('../../../../testConstants.json');

	describe('a normal user', function() {

		it('setup: login as normal user', function() {
			loginPage.loginAsMember();
			projectListPage.get();
			projectListPage.clickOnProject(constants.testProjectName);
			projectPage.textLink(constants.testText1Title).click();
			textPage.questionLink(constants.testText1Question1Title).click();
//			browser.sleep(10000);
		});

		it('cannot edit question settings - NYI', function() {
		});

		it('cannot tag answer - NYI', function() {
		});

		it('cannot edit answer', function() {
			expect(page.answers.edit.editCtrl.isDisplayed()).toBeFalsy();
		});

		it('cannot delete answer - NYI', function() {
		});

		it('cannot flag answer for export - NYI', function() {
		});

		it('cannot edit comment - NYI', function() {
		});

		it('cannot delete comment - NYI', function() {
		});

	});
/*
	describe('a project manager', function() {
		var questionTitle = '111TestQTitle1234';
		var questionDesc = '111TestQDesc1234';
		
		it('setup: login as manager', function() {
			loginPage.loginAsManager();
			projectListPage.get();
			projectListPage.clickOnProject(constants.testProjectName);
			projectPage.textLink(constants.testText1Title).click();
		});

		it('can add new questions', function() {
			expect(textPage.addNewBtn.isDisplayed()).toBeTruthy();
			textPage.addNewQuestion(questionDesc, questionTitle);
			expect(textPage.questionLink(questionTitle).isDisplayed()).toBe(true);
		});

		it('can click through to newly created question', function() {
			textPage.questionLink(questionTitle).click();
			browser.navigate().back();
		});
		
		it('can archive the question that was just created', function() {
			var archiveButton = textPage.archiveButton.find();
			expect(archiveButton.isDisplayed()).toBe(true);
			expect(archiveButton.isEnabled()).toBe(false);
			util.setCheckbox(textPage.getFirstCheckbox(), true);
			expect(archiveButton.isEnabled()).toBe(true);
			archiveButton.click();
			browser.switchTo().alert().accept();
			expect(archiveButton.isEnabled()).toBe(false);
			expect(textPage.questionLink(questionTitle).isPresent()).toBe(false);
		});

		it('can re-publish the question that was just archived (Text Settings)', function() {
			textPage.textSettingsBtn.click();
			textSettingsPage.tabs.archiveQuestions.click();
			expect(textSettingsPage.archivedQuestionsTab.questionLink(questionTitle).isDisplayed()).toBe(true);
			var publishButton = textSettingsPage.archivedQuestionsTab.publishButton.find();
			expect(publishButton.isDisplayed()).toBe(true);
			expect(publishButton.isEnabled()).toBe(false);
			util.setCheckbox(textSettingsPage.archivedQuestionsTabGetFirstCheckbox(), true);
			expect(publishButton.isEnabled()).toBe(true);
			publishButton.click();
			expect(textSettingsPage.archivedQuestionsTab.questionLink(questionTitle).isPresent()).toBe(false);
			expect(publishButton.isEnabled()).toBe(false);
			browser.navigate().back();
			expect(textPage.questionLink(questionTitle).isDisplayed()).toBe(true);
		});
		
		it('can delete questions', function() {
			expect(textPage.archiveButton.isDisplayed()).toBeTruthy();
		});

		it('can create templates', function() {
			expect(textPage.makeTemplateBtn.isDisplayed()).toBeTruthy();
		});

		it('can edit text settings', function() {
			// The text settings button should both exist and be displayed for a manager
			expect(textPage.textSettingsBtn.isPresent()).toBeTruthy();
			expect(textPage.textSettingsBtn.isDisplayed()).toBeTruthy();
		});

		it('can edit text content', function() {
			textPage.textSettingsBtn.click();
			// TODO: Use actual USX from projectPage.testData (maybe move it to testConstants) for this test, then verify it shows up properly on the question page
			var letMeEditCheckbox = element(by.model('editedText.editPreviousText'));
			var contentEditor = element(by.model('editedText.content'));
			contentEditor.sendKeys('Hello, world!');
			util.setCheckbox(letMeEditCheckbox, true);
			// Should pop up two alerts in a row
			// First alert: "This is dangerous, are you sure?"
			util.waitForAlert();
			var alert = browser.switchTo().alert();
			alert.accept();
			// Second alert: "You have previous edits which will be replaced, are you really sure?"
			browser.sleep(100);
			util.waitForAlert();
			alert = browser.switchTo().alert();
			alert.accept();
			// TODO: Check alert text for one or both alerts (see http://stackoverflow.com/a/19884387/2314532)
			expect(contentEditor.getAttribute('value')).toBe(constants.testText1Content);
		});
	});

	describe('a site admin', function() {
		it('setup: login as admin', function() {
			loginPage.loginAsAdmin();
			projectListPage.get();
			projectListPage.clickOnProject(constants.testProjectName);
			projectPage.textLink(constants.testText1Title).click();
		});

		it('can add new questions', function() {
			expect(textPage.addNewBtn.isDisplayed()).toBeTruthy();
		});

		it('can delete questions', function() {
			expect(textPage.archiveButton.isDisplayed()).toBeTruthy();
		});

		it('can create templates', function() {
			expect(textPage.makeTemplateBtn.isDisplayed()).toBeTruthy();
		});

		it('can edit text settings', function() {
			// The text settings button should both exist and be displayed for a site admin
			expect(textPage.textSettingsBtn.isPresent()).toBeTruthy();
			expect(textPage.textSettingsBtn.isDisplayed()).toBeTruthy();
		});
		
	});
*/	
});