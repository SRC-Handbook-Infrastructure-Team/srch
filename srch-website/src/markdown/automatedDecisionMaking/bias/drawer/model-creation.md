### Understanding Model Creation Phase of AI Development

**Once a dataset is created, a model must be defined, trained, evaluated, and deployed.** Defining an AI model involves determining the model architecture, loss function, optimizer, and hyperparameters. Next the model is trained, requiring decisions about how many epochs to train on. Once trained, the model is evaluated on metrics like accuracy, F1 accuracy, and/or accuracy across categories. Following this, model post-processing like thresholding can be implemented to transform outputs into a task-specific format. Once the model has been trained, evaluated, and post-processed, it is deployed for real-world use. It is useful to view the model creation process as iterative rather than linear. Once a model is deployed, it can be trained on real-time data or augmented to increase accuracy for under-performing categories.[^1] ChatGPT is an example of this; it improves its output by training on user data (input) and personalizing responses through its user memory feature which stores a summary of user data.[^2]

[^1]: Suresh, “A Framework for Understanding Sources of Harm"
[^2]: “Memory and New Controls for ChatGPT”
