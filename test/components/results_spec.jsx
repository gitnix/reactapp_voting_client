import React from 'react';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';

describe('Results', ()=>{

  it('renders entries with vote counts or zero', ()=>{
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map({'Trainspotting':5, '28 Days Later':4});
    const component = TestUtils.renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = TestUtils.scryRenderedDOMComponentsWithClass(component,'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('4');
  });//end it

  it('invokes next callback when next button pressed', ()=> {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = TestUtils.renderIntoDocument(
      <Results
        pair={pair}
        tally={Map()}
        next={next}
      />
    );
    TestUtils.Simulate.click(React.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);

  });//end it

  it('renders the winner when there is one', ()=> {
    const component = TestUtils.renderIntoDocument(
      <Results
        winner="Trainspotting"
        pair={["Trainspotting", "28 Days Later"]}
        tally={Map()}
      />
    );
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });//end it

});//end describe
