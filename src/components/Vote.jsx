import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  isDisabled: function(){
    //this would mean if 'true' if a value exists
    return !!this.props.hasVoted;
  },
  hasVotedFor: function(entry) {
    return this.props.hasVoted === entry;
  },
  render: function() {
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}
                disabled={this.isDisabled()}
                onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
          {this.hasVotedFor(entry) ?
          <div className="label">Voted</div> : null}
        </button>
      )}
      </div>;
    }
});


// import React from 'react';
// // import styles from '../styles/main.css';
//
// export default class Voting extends React.Component{
//
//   constructor(props){
//     super(props);
//   };
//
//   getPair() {
//     // return this.props.pair;
//     return this.props.pair;
//   };
//
//   render(){
//     return (
//       <div className="voting">
//         {this.getPair().map(entry =>
//           <buton className="btn" key={entry}>
//             <h1>{entry}</h1>
//           </buton>
//         )}
//       </div>
//     );
//   };
// };
