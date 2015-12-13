Parse.initialize("bck5MqFK8Xm5LK6TBuaSec2LRaVsz9Bff4cV55W2", "iONuVeJEeqF1RCoLXCXBciFxntpUk1k7AFKfshEo");
var EstrelaQueBrilha = Parse.Object.extend("EstrelaQueBrilha");

var estrelinha = Parse.Object.extend("Estrela");
var query = new Parse.Query(estrelinha);
query.equalTo("starid", "Matheus1");
query.ascending("createdAt")
query.limit(1000);

var vectors = [];
query.find({
  success: function(results) {
    console.log("Pegou dados");
    // vectors_xyz são EstrelaQueBrilha
    var vectors_xyz = suaviza(results);
    console.log(vectors_xyz);

    Parse.Object.saveAll(vectors_xyz, {
      success: function(objs) {
        console.log("Salvou");
      },
      error: function(error) {
        console.log("Não salvou");
        console.error(error);
      }
    });
  }, error: function(error) {
    console.log(error);
  }

});

function suaviza(estrelas) {
  var resposta = [];
  var atual = null;
  var index = 0;
  var velocity = 0.0, x = 0.0, y = 0.0, z = 0.0;

  estrelas.forEach(function(element) {
    "use strict";
    if(atual == null){
      atual = new EstrelaQueBrilha({starid : element.get('starid'),
      t : index++,
      x : 0.0,
      y : 0.0,
      z : 0.0,
      v : 0.0});
      resposta.push(atual);

      return;
    } else {
      var anterior = atual;
      var v = anterior.get('v') * .95 + element.get('acceleration');

      atual = new EstrelaQueBrilha({starid : element.get('starid'),
      t : index++,
      x : anterior.get('x') + Math.cos(element.get('alpha') * 2 * Math.PI / 360) * v * 1,
      y : anterior.get('y') + Math.cos(element.get('beta') * 2 * Math.PI / 360) * v * 1,
      z : anterior.get('z') + Math.cos(element.get('gamma') * 2 * Math.PI / 360) * v * 1,
      v : v});
      resposta.push(atual);
    }
  });
  return resposta;
}
