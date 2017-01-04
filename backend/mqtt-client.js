module.exports = function(cb) {
    var mqtt = require('mqtt'),
        config = require('./config').exp2,
        // mraa = require('mraa'),
        // SerialPort = require('serialport'),
        fs = require('fs'),
        protobuf = require('protocol-buffers')

    // -----------------------------------
    //  Read from config.js
    const Broker = config.Broker,
        room = cb.path,
        node = cb.nodeName,
        topicBase = room + '/' + node + '/'

    // -----------------------------------
    // protobuf: Schema
    var schema = protobuf(fs.readFileSync('protobuf.proto'));

    // -----------------------------------
    // Connect Broker
    client = mqtt.connect('ws://' + Broker.ip + ':' + Broker.port);

    client.on('connect', function(ck) {
        console.log('Broker: connected');
    });

    // -----------------------------------
    // Subscribed Topics
    var subscribedTopics = ['#'];
    for (var i = 0; i < subscribedTopics.length; i++) {
        client.subscribe(subscribedTopics[i]);
    }

    // -----------------------------------
    // mqtt: On Topics
    client.on('message', function(topic, message) {
        // console.log(topic, message);
    });

    // -----------------------------------
    // sensor: function
    // var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
    // var analogPin1 = new mraa.Aio(1);

    const vcc = 4.5; // input volt
    const r1 = 10.0; // [Kohm]
    const tempOffSet = 0;

    // var readTemp = function() {
    //   var a0 = analogPin0.read(); //read the value of the analog pin0
    //   var v0 = a0*vcc/1024; // analog pin0 voltage
    //   var temp = (v0*100 - tempOffSet).toFixed(1);
    //   var payload = schema.Sensor.encode({
    //     temp: temp
    //   });
    //   var topic = topicBase + 'temp';
    //   client.publish(topic, payload);
    // }

    // var readIll = function() {
    //   var a1 = analogPin1.read();
    //   var ill = a1;
    //   var topic = topicBase + 'ill';
    //   var payload = schema.Sensor.encode({
    //     ill: ill
    //   });
    //   client.publish(topic, payload);
    // }


    // readMirco = function() {
    //   u = new mraa.Uart(0); // UART0 Location: Pins 0 (RX) and 1 (TX)
    //   var serialPath = u.getDevicePath(); // "/dev/ttyMFD1"
    //   u.setMode(8, 0, 1);
    //   u.setFlowcontrol(false, false);
    //   var serialPort = new SerialPort(serialPath, {
    //       baudrate: 115200
    //   });
    //   // On SerialPort
    //   serialPort.on("open", function(){
    //     console.log("SerialPort opened...");
    //     serialPort.on("data", function(data) { //Read available data from serial port
    //       var type = data.toString('hex', 8, 9); // get type from payload
    //       switch(type) {
    //         case '01': // 波形データ
    //           var heart_buf = new Buffer(data.toString('hex', 10,12), 'hex')
    //             , breath_buf = new Buffer(data.toString('hex', 12,14), 'hex')
    //             , motion_buf = new Buffer(data.toString('hex', 14,16), 'hex')
    //             , heart_w = heart_buf.readInt16BE(0)
    //             , breath_w = breath_buf.readInt16BE(0)
    //             , motion_w = motion_buf.readInt16BE(0);
    //           var payload = schema.Sensor.encode({
    //             heart_w: heart_w,
    //             breath_w: breath_w,
    //             motion_w: motion_w
    //           });
    //           var topic = topicBase + 'micro_wave';
    //           client.publish(topic, payload);
    //           break;
    //         case '02': // 心拍数（+ 確度）
    //           var heart_buf = new Buffer(data.toString('hex', 10,11), 'hex')
    //             , accuracy_buf = new Buffer(data.toString('hex', 11,12), 'hex')
    //             , heart = heart_buf.readInt8(0)
    //             , accuracy = accuracy_buf.readInt8(0);
    //           console.log('心拍数：'+ heart, '確度：'+ accuracy);
    //           var payload = schema.Sensor.encode({
    //             heart: heart.toString(),
    //             accuracy: accuracy.toString()
    //           });
    //           var topic = topicBase + 'heart';
    //           client.publish(topic, payload);
    //           break;
    //         case '03': // 呼吸数（+ 確度）
    //           var breath_buf = new Buffer(data.toString('hex', 10,11), 'hex')
    //             , accuracy_buf = new Buffer(data.toString('hex', 11,12), 'hex')
    //             , breath = breath_buf.readInt8(0)
    //             , accuracy = accuracy_buf.readInt8(0);
    //           console.log('呼吸数：'+ breath, '確度：'+ accuracy);
    //           var payload = schema.Sensor.encode({
    //             heart: breath.toStrin(),
    //             accuracy: accuracy.toString()
    //           });
    //           var topic = topicBase + 'breath';
    //           client.publish(topic, payload);
    //           break;
    //         case '0a': // 体動量
    //           var motion_buf = new Buffer(data.toString('hex', 10,11), 'hex')
    //             , motion = motion_buf.readInt16BE(0);
    //           console.log('体動量：'+ motion);
    //           var topic = topicBase + 'motion';
    //           var payload = schema.Sensor.encode({
    //             motion: motion
    //           });
    //           client.publish(topic, payload);
    //           break;
    //         default: break;
    //       }
    //     })
    //   })
    // }
    // readMirco();

    // -----------------------------------
    // // Publish function
    // start1 = setInterval(readTemp, 1000);
    // start2 = setInterval(readIll, 1000);
}