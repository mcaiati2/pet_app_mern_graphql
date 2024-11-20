import { faker } from "@faker-js/faker";

const username = faker.person.firstName() + faker.person.lastName(); // + combines the strings for a username with no spaces
const petName = faker.animal.dog();

function loginUser(cy) {
  cy.visit('/login');

  // Select the username
  cy.get('input[name="email"]').type(username + '@test.com');

  // Select password input and type 'password123'
  cy.get('input[name="password"]').type('password123');

  // Select the Submit button and click it
  cy.get('button[type="submit"]').click();
}

describe('Site Tests', () => {
  it('Should show the homepage hero', () => {
    cy.visit('/'); // show the home page

    cy.get('h1').contains('Petstagram') // grab the h3 by a data-hero-header
  });

  it('Should show the register page', () => {
    cy.visit('/register');

    cy.get('nav a[href="/register"]').click(); // get that and then click it

    cy.get('form h2').contains('Register'); // /ig - ignore case sensitivity?
  });

  it('Should regsiter a new user', () => {
    // Visit the register page
    cy.visit('/register');

    // Select the username input and type a fake name
    cy.get('input[name="username').type(username);

    // Select the email input and type the fake name@test.com
    cy.get('input[name="email').type(username + '@test.com');

    // Select password input and type 'password123'
    cy.get('input[name="password').type('password123');

    // Select the Submit button and click it
    cy.get('button[type="submit"]').click(); // JD's version -  cy.get('form button').click(); 

    cy.get('h3').contains('Your Pets')  // You should be able to select the header on the dashboard that contains the text Your Pets
  });

  it('Should log in a user', () => {
    loginUser(cy);

    // cy.get('form button').click(); // JD version
    cy.get('h3').contains('Your Pets');
  });

  // Log out test
  it('Should log a user out', () => {
    loginUser(cy);

    cy.get('nav a').contains('Profile Menu').click();

    cy.get('nav a').contains('Log Out').click();

    cy.get('nav').should('not.contain', 'Dashboard'); // 'should not have anything with dashboard in it'

    cy.get('h1').contains('Petstagram');
  });

  it('Should be able to create a pet for the logged in user', () => {

    loginUser(cy);

    cy.get('nav a[href="/pet"]').click();

    cy.get('input[name="name"]').type(petName);

    cy.get('input[name="type"]').type('dog');

    cy.get('input[name="age"').type(5);

    cy.get('button[type="submit"]').click();

    // Check that the pet shows up on the dashboard
    cy.get('.pet-output').contains(petName);
  });

  // Add a post for a pet
  it('Should add a post for a pet', () => {
    const postTitle = 'Post for' + petName;

    loginUser(cy);

    cy.get('article')
    .contains(petName)
    .get('button')
    .first()
    .click();

    cy.get('input[name="title"]').type(postTitle);
    cy.get('textarea[name="body"]').type('Oh happy day, I get a treat');

    cy.get('.modal-footer button').last().click();

    cy.get('article')
    .contains(petName)
    .get('button')
    .last()
    .click();


    cy.get('.modal-body').contains(postTitle);
  });
});
