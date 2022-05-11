import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme'; 
import CreatePokemon from "./index.jsx";
import Enzyme,{ configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17';
configure({ Adapter: new Adapter() });

describe('CreatePokemon', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<CreatePokemon />);
  });
  it('El form debe tener un label que diga: "Nombre:"', () => {
      const { container } = render(<CreatePokemon />)
      const element = container.querySelectorAll('label')[0]
      expect(element.innerHTML).toBe('Nombre:');
  });

  it('El form debe tener un label que diga: "Puntos de salud:"', () => {
    const { container } = render(<CreatePokemon />)
    const element = container.querySelectorAll('label')[1]
    expect(element.innerHTML).toBe('Puntos de salud:');
  });

  it('El form debe tener un input con name "name" y type "text"', () => {
    const { container } = render(<CreatePokemon />)
    const element = container.querySelectorAll('input')[0]
    expect(element.type).toBe('text');
    expect(element.name).toBe('name');
  });

  it('El form debe tener un input con name "hp" y type "number"', () => {
    const { container } = render(<CreatePokemon />)
    const element = container.querySelectorAll('input')[1]
    expect(element.type).toBe('number');
    expect(element.name).toBe('hp');
  });
});


/* import React from "react";
import { configure, mount } from "enzyme";
 import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
 import configureStore from "redux-mock-store"; 
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "../../db.json";
import CreatePokemon from "./index.jsx";
import * as actions from "../redux/actions";

configure({ adapter: new Adapter() });

describe("<CreatePokemon />", () => {

  beforeAll(() => expect(isReact.classComponent(CreatePokemon)).toBeFalsy());

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("Estructura", () => {
    let createPoke;
    let store = mockStore(state);
    beforeEach(() => {
      createPoke = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/create"]}>
            <CreateHouse />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(createPoke.find("form")).toHaveLength(1);
  
    it('Debería renderizar un label con el texto "Nombre:"', () => {
      expect(createPoke.find("label").at(0).text()).toEqual("Nombre:");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createPoke.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Puntos de salud:"', () => {
      expect(createPoke.find("label").at(1).text()).toEqual("Puntos de salud:");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "hp"', () => {
      expect(createPoke.find('input[name="hp"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Ataque:"', () => {
      expect(createPoke.find("label").at(2).text()).toEqual("Ataque:");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "attack"', () => {
      expect(createPoke.find('input[name="attack"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Crear Pokemon"', () => {
      expect(createPoke.find('button[type="submit"]')).toHaveLength(1);
      expect(createPoke.find("button").at(0).text()).toEqual("Crear Pokemon");
    });
  });
})});
 */