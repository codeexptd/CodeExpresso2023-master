/**
 * @jest-environment jsdom
 */

import { addAudioVolumeSliderFunctionality, getAudioSrc, addAudioElementToBody, 
    addSFXVolumeSliderFunctionality, addSoundEffect } from '../audioEssentials';

import defaulttheme from "../../../assets/music/defaulttheme.mp3";
import coffeetheme from "../../../assets/music/coffeetheme.mp3"; 
import fantasytheme from "../../../assets/music/fantasytheme.mp3"; 
import tropicaltheme from "../../../assets/music/tropicaltheme.mp3";

describe('addAudioVolumeSliderFunctionality', () => {
    test('should add change event listener to slider element and set cookie', () => {
        // Arrange
        document.body.innerHTML = `
        <audio id="audio" src="audio.mp3"></audio>
        <input id="slider" type="range" min="0" max="100" value="50">
        `;
        const audioElementID = 'audio';
        const sliderID = 'slider';
        const sliderElement = document.getElementById(sliderID);
        const setCookieMock = jest.fn();
        window.setCookie = setCookieMock;

        // Act
        addAudioVolumeSliderFunctionality(audioElementID, sliderID);
        sliderElement.dispatchEvent(new Event('change'));

        // Assert
        expect(sliderElement).toHaveProperty('onchange');
        expect(document.cookie).toMatch(`${'musicVolume'}=${''}`);
    });
});

describe('getAudioSrc', () => {
    test('returns the correct audio source file for the given theme', () => {
        const theme1Src = getAudioSrc('theme1');
        const theme2Src = getAudioSrc('theme2');
        const theme3Src = getAudioSrc('theme3');
        const muteSrc = getAudioSrc('mute');
        const defaultSrc = getAudioSrc('invalidTheme');
    
        expect(theme1Src).toBe(fantasytheme);
        expect(theme2Src).toBe(tropicaltheme);
        expect(theme3Src).toBe(coffeetheme);
        expect(muteSrc).toBe('mute');
        expect(defaultSrc).toBe(defaulttheme);
    });
});

describe('addAudioElementToBody', () => {
    test('should add an audio element to the body', () => {
        // Arrange
        const audioElementID = 'test-audio-element';
        document.body.innerHTML = '<div id="audioContainer"></div>';
    
        // Act
        addAudioElementToBody(audioElementID, getAudioSrc("default"));
    
        // Assert
        expect(document.getElementById(audioElementID)).toBeDefined();
        expect(document.getElementById(audioElementID).tagName).toBe('AUDIO');
        expect(document.getElementById(audioElementID).getAttribute('src')).toBe(getAudioSrc("default"));
    });
    
    test('should add an event listener to the document', () => {
        // Arrange
        const audioElementID = 'test-audio-element';
        document.body.innerHTML = 
        `
        <div id="audioContainer"></div>
        <input id="musicVolume" type="range" min="0" max="100" step="1"/>
        `;

        const playStub = jest
        .spyOn(window.HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => {})
    
        // Act
        addAudioElementToBody(audioElementID, getAudioSrc("default"));
        document.dispatchEvent(new MouseEvent('click'));
    
        // Assert
        expect(playStub).toHaveBeenCalled();
        expect(document.getElementById(audioElementID).volume).not.toBe(0);

        jest.clearAllMocks();
    });
});

describe('addSFXVolumeSliderFunctionality', () => {
    beforeEach(() => {
        // Create a fake slider element
        document.body.innerHTML =
        `
        <input id="sfxVolume" type="range" min="0" max="100" step="1"/>
        `;
    });
  
    test('sets a cookie with the correct volume when slider is changed', () => {
        // Call the function and pass in the slider element
        addSFXVolumeSliderFunctionality('sfxVolume');
        
        var sliderElement = document.getElementById('sfxVolume');
        // Simulate a change event on the slider
        sliderElement.value = '70';
        sliderElement.dispatchEvent(new Event('change'));
    
        // Expect that setCookie has been called with the correct arguments
        expect(document.cookie).toMatch(`${'SFXVolume'}=${0.7}`);
    });
});

describe('addSoundEffect', () => {
    test('plays a sound whenever elements, with the given class name, are clicked', () => {
        document.body.innerHTML = 
        `
        <button type="button" class="btn-sound" id="button1" >Button1</button>
        <button type="button" class="btn-sound" id="button2" >Button2</button>
        <button type="button" class="btn-sound" id="button3" >Button3</button>
        <input id="sfxVolume" type="range" min="0" max="100" step="1"/>
        `;

        const playStub = jest
        .spyOn(window.HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => {})
    

        addSoundEffect('btn-sound');

        document.getElementById('button1').dispatchEvent(new Event('click'));
        document.getElementById('button2').dispatchEvent(new Event('click'));
        document.getElementById('button3').dispatchEvent(new Event('click'));

        
        // Assert
        expect(playStub).toHaveBeenCalledTimes(3);
    });
});