//
//  ParameterLoader.h
//  gpuParticleSystemExample
//
//  Created by Karina Korsgaard Jensen on 21/11/2017.
//

#ifndef ParameterLoader_h
#define ParameterLoader_h
#include "ofxGui.h"

class ParameterLoader{
public:
 
    ofxPanel gui;
    ofParameterGroup guiGroup;
    vector < string > linesOfTheFile;
    
    void setup(string file){
        
        ofBuffer buffer = ofBufferFromFile(ofToDataPath(file));
        auto lines = ofSplitString(ofBufferFromFile(file).getText(), "\n");
        
        for(int i = 0; i<lines.size();i++){
            if(lines[i]!=""){
                ofParameter<float>a;
                guiGroup.add(a.set(lines[i],0.,0.,5.));
                
            }
            
        }
        gui.setup(guiGroup);
        gui.loadFromFile("settings.xml");
    }
    void draw(){
        gui.draw();
    }

    

    
    
};
#endif /* ParameterLoader_h */
