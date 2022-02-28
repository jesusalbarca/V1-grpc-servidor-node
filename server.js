/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/proto/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

//var command = grpc.loadPackageDefinition(packageDefinition).command;

/**
 * Implements the SayHello RPC method.
 */
 function sayHello(call, callback) {
  callback(null, {message: 'Hello desde el servidor: ' + call.request.name});
  console.log('mensaje recibido servicio Greeting, cliente conectado: Bienvenido');
  console.log(call.request.name);
}

function sayHelloAgain(call, callback) {
  callback(null, {message: 'Hello again, ' + call.request.name});
}

function AddMessage(call, callback) {
  callback(null, {message: 'Recibido correctamente el mensaje: ' + call.request.MessageType});
  console.log('mensaje recibido servicio Greeting');
  console.log(call.request);
}

// Service Command
function LightsOn(call, callback) {
  callback(null, {message: 'Recibido correctamente el comando: ' + call.request.CommandType});
  console.log('mensaje recibido servicio Command');
  console.log(call.request);
}

function LightsOff(call, callback) {
  callback(null, {message: 'Recibido correctamente el comando: ' + call.request.CommandType});
  console.log('comando recibido');
  console.log(call.request);
}

function MoveHome(call, callback) {
  callback(null, {message: 'Recibido correctamente el comando: ' + call.request.CommandType});
  console.log('comando recibido');
  console.log(call.request);
}




function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello, sayHelloAgain: sayHelloAgain, AddMessage: AddMessage});
  server.addService(hello_proto.Command.service, {LightsOn: LightsOn, LightsOff: LightsOff, MoveHome: MoveHome});
  
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();