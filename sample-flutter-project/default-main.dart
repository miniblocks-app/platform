import 'package:flutter_web/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('Flutter Demo Home Page')),
        body: Column(children: <Widget>[
          Text('You have pushed the button this many times:'),
          Text('$_counter')
        ]),
        floatingActionButton: FloatingActionButton(
            onPressed: () {
              setState(() {
                _counter++;
              });
            })
    );
  }
}
