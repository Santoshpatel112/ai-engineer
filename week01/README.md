# WEEK01 — Learning Log

LLM ->Large Language Model
how gpt work
GPT ->Generative Pretrain Transformer
everything is science and math



Gen Pre-Trained Transformer


Generative - > data indexing give relevent content bassed on the input next  set of sequences based on the pretrain data

Internet Books Historical data

work on the transformer
Transformer - >google white paper google made tranformer model
Transformer Model

Hello how are you

Transformer - >input ko output me convert krta hai

text - - - - > to image or text or video or image or voice

primary ->google translate


GPT
it takes some input
work on the Predection model
next word predict

reapet untill end
predict next word jb tk end nhi mil jata


how transformer work

Hey there
computer ke liye most math number

**1 step Input Encoding - >token me split**

assing equals number of value

tokeize that
hey->10,there ->36


token varies model to model

token map word to number
tokenizer - >common resubale word


vocab size - >


vectro Embeding - > hr ek word ka meaning hota hai

cat - >milk
dog ?
dog -> Pedig

real world me hm dhekhte hai tbhi predict kr paye

what is the vector Embeding ???????

Vector Embeding are numerical representation of the data , like word , images or audio that capture semantic relationship and meaning allowing macine learning models to process and compare then effciently

there are 500+ dimensions

**
tokenize
word to number - >vector Embeding for sematic meaning
**


with vector Embeding model
client.create.embeddings.create


** step 2 Positional Encoding**

token by token embedings
sentance ki position kya hai

The dog cased cat
The cat chsed dog

token ki positiin btata
hai vector emding ke upar kuchh add krta hai
== kind of diffrent matrix


new matrix positon also encoded





**step3 multihead attentions**

multihead attentions
RNN ---> .....    ......    ...... ......
toiken hainap baribari encode kroge

but ap context loose kr diye one sequence at a time

the river bank
the icic bank
context diffrent

self Attentions
the token allow to  talk to each other change the semantic meaning

Context of the words is maintained
Related word to each other


singel head selp attentions


multihead attections
Improve contextual understanding

combine krta hai
overall are context to maintain krta hai



**step 4 Normalization and feed farword**


encoding -  > vecotor emb.......feed farword
pure process me apke op toekn refine again and again


Detokenize then give Human readble content

feed farword

How output are generate
Hi How are encoder ko diya
Hii how you --> op --> decoder  --><start>what will happen
basically goes output
predict next word
multiple Predication
traning phase and infrencing phase
jaha use krte hai

output i am fine
<EOS> label --> calculte loss
this is my expected op
-->BackPropegation minimize the error change the weight keep updatedint the weight
backpropegattion model trained next toekn predict mtach with the label



Intrefrencing mode


Based on the traning data give --- >I
take this start the process agian

then again restart Process untill End of the String

linear - >soff max function which one is choose
soff responsible for picking the  next
Soff max - > increses the creativity -- tempature