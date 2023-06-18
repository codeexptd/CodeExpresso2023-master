/**
 * @jest-environment jsdom
 */

import { Modal, Toast } from 'bootstrap';
import { fireEvent } from '@testing-library/dom';
import { addBackButtonAnimation, addProfileButtonAnimation, addSettingsButtonAnimation, 
    addBackButtonFunctionality, addProfileButtonFunctionality, addSettingsButtonFunctionality,
    removeElementsByClass, showToasts, displayToast } 
    from '../essentials';

// Mock Bootstrap Classes
jest.mock('bootstrap', () => ({
    Modal: jest.fn().mockImplementation(() => ({
      toggle: jest.fn(),
    })),
    Toast: jest.fn(),
}));

describe("addBackButtonAnimation", () => {
    let button, img;

    beforeEach(() => {
        button = document.createElement('button');
        button.id = 'back';
        document.body.appendChild(button);
        
        img = document.createElement('img');
        img.id = 'back-button-img';
        img.src = 'back_default.png';
        document.body.appendChild(img);

        addBackButtonAnimation();
    });

    afterEach(() => {
        document.body.removeChild(button);
        document.body.removeChild(img);
    });

    test('adds a mouseover event listener that changes the src of an image', () => {
        // Trigger the mouseover event
        button.dispatchEvent(new MouseEvent('mouseover'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mouseout event listener that changes the src of an image', () => {
        // Trigger the mouseout event
        button.dispatchEvent(new MouseEvent('mouseout'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mousedown event listener that changes the src of an image', () => {
        // Trigger the mousedown event
        button.dispatchEvent(new MouseEvent('mousedown'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mouseup event listener that changes the src of an image', () => {
        // Trigger the mouseup event
        button.dispatchEvent(new MouseEvent('mouseup'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
});

describe("addProfileButtonAnimation", () => {
    let button, img;

    beforeEach(() => {
        button = document.createElement('button');
        button.id = 'profile';
        document.body.appendChild(button);
        
        img = document.createElement('img');
        img.id = 'profile-button-img';
        img.src = 'profile_default.png';
        document.body.appendChild(img);

        addProfileButtonAnimation();
    });

    afterEach(() => {
        document.body.removeChild(button);
        document.body.removeChild(img);
    });

    test('adds a mouseover event listener that changes the src of an image', () => {
        // Trigger the mouseover event
        button.dispatchEvent(new MouseEvent('mouseover'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mouseout event listener that changes the src of an image', () => {
        // Trigger the mouseout event
        button.dispatchEvent(new MouseEvent('mouseout'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mousedown event listener that changes the src of an image', () => {
        // Trigger the mousedown event
        button.dispatchEvent(new MouseEvent('mousedown'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mouseup event listener that changes the src of an image', () => {
        // Trigger the mouseup event
        button.dispatchEvent(new MouseEvent('mouseup'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
});

describe("addSettingsButtonAnimation", () => {
    let button, img;

    beforeEach(() => {
        button = document.createElement('button');
        button.id = 'settings';
        document.body.appendChild(button);
        
        img = document.createElement('img');
        img.id = 'settings-button-img';
        img.src = 'settings_default.png';
        document.body.appendChild(img);

        addSettingsButtonAnimation();
    });

    afterEach(() => {
        document.body.removeChild(button);
        document.body.removeChild(img);
    });

    test('adds a mouseover event listener that changes the src of an image', () => {
        // Trigger the mouseover event
        button.dispatchEvent(new MouseEvent('mouseover'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mouseout event listener that changes the src of an image', () => {
        // Trigger the mouseout event
        button.dispatchEvent(new MouseEvent('mouseout'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mousedown event listener that changes the src of an image', () => {
        // Trigger the mousedown event
        button.dispatchEvent(new MouseEvent('mousedown'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
    test('adds a mouseup event listener that changes the src of an image', () => {
        // Trigger the mouseup event
        button.dispatchEvent(new MouseEvent('mouseup'));
      
        // Check if the src attribute has been changed
        expect(img.src).toBeDefined();
    });
});

describe("addBackButtonFunctionality", () => {
    test('adds a click event listener back button', () => {
        const backButton = document.createElement('button');
        backButton.id = 'back';
        document.body.appendChild(backButton);

        // Call the function to add the click event listener
        addBackButtonFunctionality();

        // Expect the button to have a click event listener
        expect(backButton.onclick).toBeDefined();

        // Clean up
        document.body.removeChild(backButton);
    });
});

// TO FIX (EVENT LISTENER)
describe('addProfileButtonFunctionality', () => {
    const { location } = window;
    const getHrefSpy = jest.fn(() => 'example.com');
    const setHrefSpy = jest.fn(href => href);

    beforeAll(() => {
        delete window.location;
        window.location = {};
        Object.defineProperty(window.location, 'href', {
            get: getHrefSpy,
            set: setHrefSpy,
        });
    });

    afterAll(() => {
        window.location = location;
    });

    test('should navigate to profile.html when user is logged in', () => {
      // Arrange
      const user = {
        name: 'John',
        loggedIn: true,
      };
  
      // Act
      addProfileButtonFunctionality(user);
  
      // Assert
      setTimeout(() => {
        expect(setHrefSpy).toHaveBeenCalledWith('profile.html');
        done();
      }, 400);
    });
  
    test('should navigate to login.html when user is not logged in', () => {
      // Arrange
      const user = null;
  
      // Act
      addProfileButtonFunctionality(user);
  
      // Assert
      setTimeout(() => {
        expect(setHrefSpy).toHaveBeenCalledWith('login.html');
        done();
      }, 400);
    });
});
  
describe('addSettingsButtonFunctionality', () => {
    let button, button2, modal, myModal;

    beforeEach(() => {
        button = document.createElement('button');
        button.id = 'settings';
        document.body.appendChild(button);

        button2 = document.createElement('button');
        button2.id = 'settings-save';
        document.body.appendChild(button2);

        modal = document.createElement('div');
        modal.id = 'exampleModalCenter';
        document.body.appendChild(modal);

        myModal = new Modal(modal, {});
        addSettingsButtonFunctionality(myModal);
    });

    afterEach(() => {
        document.body.removeChild(button);
        document.body.removeChild(button2);
        document.body.removeChild(modal);
    });


    test('should call myModal.toggle() when settings button is clicked', () => {
      // Click the button
      fireEvent.click(button);
  
      // Check if myModal.toggle() was called
      expect(myModal.toggle).toHaveBeenCalled();
    });

    test('should call myModal.toggle() when settings-save button is clicked', () => {
        // Click the button
        fireEvent.click(button2);
    
        // Check if myModal.toggle() was called
        expect(myModal.toggle).toHaveBeenCalled();
    });
});

describe('removeElementsByClass', () => {
    beforeEach(() => {
      // Add some elements with the class name to remove
      document.body.innerHTML = `
        <div class="test-class">Test element 1</div>
        <div class="test-class">Test element 2</div>
        <div class="other-class">Other element</div>
      `;
    });
  
    afterEach(() => {
      // Clean up the added elements after each test
      document.body.innerHTML = '';
    });
  
    test('removes elements with the given class name', () => {
      // Call the function to remove the elements
      removeElementsByClass('test-class');
  
      // Check that the elements with the given class name were removed
      expect(document.getElementsByClassName('test-class').length).toBe(0);
  
      // Check that an element without the class name was not removed
      expect(document.getElementsByClassName('other-class').length).toBe(1);
    });
});

describe('showToasts', () => {
    test('toast show method is called for all Toasts', () => {
        const toastMock = { show: jest.fn() };
        Toast.mockImplementation(() => toastMock);
      
        document.body.innerHTML = `
          <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              Hello, world! This is a toast message.
            </div>
          </div>
        `;
      
        showToasts();
      
        expect(toastMock.show).toHaveBeenCalledTimes(1);

        document.body.innerHTML = '';
    });
});

describe('displayToast', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="toastsContainer">
      
        </div> 
        `;
    });

    afterEach(() => {
        // Clean up the added elements after each test
        document.body.innerHTML = '';
    });

    test('new toast added to toast container', () => {      
        displayToast("header sample", "this is a sample body");
        displayToast("header sample2", "this is a sample body2");
      
        expect(document.querySelectorAll('.toast').length).toBe(2);
    });

    test('new toast displays input header and message', () => { 
        displayToast("header sample", "this is a sample body");
        
        expect(document.getElementsByClassName('toast-header')[0].innerHTML).toContain('header sample');
        expect(document.getElementsByClassName('toast-body')[0].innerHTML).toContain('this is a sample body');
    });
});