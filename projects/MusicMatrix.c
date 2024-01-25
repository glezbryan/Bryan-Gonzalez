#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void trim(char *str) {
    //str[strcspn(str, "\r\n")] = 0;
    str [strlen(str)-1] = 0;
}

char *readString(){
    char buffer[1024] = { 0 };
    fgets(buffer, 1024, stdin);
    trim(buffer);

    char *str = calloc(strlen(buffer)+1, sizeof(char));
    strcpy(str, buffer);

    return str;
}

int *parseRow(char *str){
    char *token = strtok(str, " ");
    int *row = calloc(12, sizeof(int));
    int i = 0;
    while(token){
        if(strcmp(token, "E") == 0)
            row[i] = 11;
        else if(strcmp(token, "T") == 0)
            row[i] = 10;
        else
            row[i] = atoi(token);

        token = strtok(NULL, " ");
        i++;
    }
    return row;
}

int *getIntervals(int *row){
    int *intervals = calloc(11, sizeof(int));
    for(int i = 0; i < 11; i++){
        intervals[i] = row[i+1] - row[i];
        if(intervals[i] < 0)
            intervals[i] += 12;
    }
    return intervals;
}

void printrow(int p, int *intervals){
    for(int i = 0; i < 11; i++){
        if(p == 11)
            printf("E  ");
        else if(p == 10)
            printf("T  ");
        else
            printf("%d  ", p);
        p += intervals[i];
        if(p > 11)
            p -= 12;
    }

    if(p == 11)
            printf("E\n");
        else if(p == 10)
            printf("T\n");
        else
            printf("%d\n", p);

}

int main(){

    printf("Enter Marix Prime Row: ");
    char *buffer = readString();
    int *primeRow = parseRow(buffer);
    int *primeIntervals = getIntervals(primeRow);
    int p = primeRow[0];
    for(int i = 0; i < 11; i++){
        printrow(p, primeIntervals);
        p += 12-primeIntervals[i];
        if(p > 11)
            p -= 12;
    }
    printrow(p, primeIntervals);
    return 1;
}